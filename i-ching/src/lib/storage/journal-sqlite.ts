import {
	CapacitorSQLite,
	SQLiteConnection,
	type SQLiteDBConnection
} from '@capacitor-community/sqlite';
import { Preferences } from '@capacitor/preferences';
import type { Casting, Tombstone } from '$lib/i-ching/types';
import { LocalJournalRepository } from './journal-local';
import {
	JOURNAL_MIGRATED_KEY,
	JOURNAL_STORAGE_KEY,
	JOURNAL_TOMBSTONES_KEY,
	mergeTombstones,
	type JournalRepository
} from './journal-repository';

const DB_NAME = 'i-ching';
const DB_VERSION = 2;

const CREATE_READINGS_TABLE = `
CREATE TABLE IF NOT EXISTS readings (
	id TEXT PRIMARY KEY NOT NULL,
	created_at TEXT NOT NULL,
	locale TEXT NOT NULL,
	question TEXT NOT NULL,
	primary_hexagram INTEGER NOT NULL,
	changed_hexagram INTEGER,
	moving_lines TEXT NOT NULL,
	method TEXT,
	lines_json TEXT NOT NULL,
	coin_rows_json TEXT,
	note TEXT
);
`;

const CREATE_TOMBSTONES_TABLE = `
CREATE TABLE IF NOT EXISTS tombstones (
	id TEXT PRIMARY KEY NOT NULL,
	deleted_at TEXT NOT NULL
);
`;

type ReadingRow = {
	id: string;
	created_at: string;
	locale: string;
	question: string;
	primary_hexagram: number;
	changed_hexagram: number | null;
	moving_lines: string;
	method: string | null;
	lines_json: string;
	coin_rows_json: string | null;
	note: string | null;
};

let db: SQLiteDBConnection | null = null;

function rowToCasting(row: ReadingRow): Casting {
	return {
		id: row.id,
		createdAt: row.created_at,
		locale: row.locale as Casting['locale'],
		question: row.question,
		primaryNumber: row.primary_hexagram,
		relatingNumber: row.changed_hexagram ?? undefined,
		changingLines: JSON.parse(row.moving_lines) as Casting['changingLines'],
		method: (row.method as Casting['method']) ?? undefined,
		lines: JSON.parse(row.lines_json) as Casting['lines'],
		coinRows: row.coin_rows_json
			? (JSON.parse(row.coin_rows_json) as Casting['coinRows'])
			: undefined,
		note: row.note ?? undefined
	};
}

async function getDatabase(): Promise<SQLiteDBConnection> {
	if (db) return db;

	const connection = new SQLiteConnection(CapacitorSQLite);
	await connection.addUpgradeStatement(DB_NAME, [
		{ toVersion: DB_VERSION, statements: [CREATE_READINGS_TABLE, CREATE_TOMBSTONES_TABLE] }
	]);
	db = await connection.createConnection(DB_NAME, false, 'no-encryption', DB_VERSION, false);
	await db.open();
	await db.execute(`${CREATE_READINGS_TABLE}${CREATE_TOMBSTONES_TABLE}`);
	return db;
}

async function migrateFromLocalStorage(database: SQLiteDBConnection): Promise<void> {
	const { value } = await Preferences.get({ key: JOURNAL_MIGRATED_KEY });
	if (value === 'true') return;

	const local = new LocalJournalRepository();
	const entries = await local.loadAll();
	const tombstones = await local.loadTombstones();

	for (const casting of [...entries].reverse()) {
		await insertCasting(database, casting);
	}
	for (const tombstone of tombstones) {
		await insertTombstone(database, tombstone);
	}

	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem(JOURNAL_STORAGE_KEY);
		localStorage.removeItem(JOURNAL_TOMBSTONES_KEY);
	}

	await Preferences.set({ key: JOURNAL_MIGRATED_KEY, value: 'true' });
}

async function insertCasting(database: SQLiteDBConnection, casting: Casting): Promise<void> {
	await database.run(
		`INSERT OR REPLACE INTO readings (
			id, created_at, locale, question, primary_hexagram, changed_hexagram,
			moving_lines, method, lines_json, coin_rows_json, note
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			casting.id,
			casting.createdAt,
			casting.locale ?? 'uk',
			casting.question,
			casting.primaryNumber,
			casting.relatingNumber ?? null,
			JSON.stringify(casting.changingLines),
			casting.method ?? null,
			JSON.stringify(casting.lines),
			casting.coinRows ? JSON.stringify(casting.coinRows) : null,
			casting.note ?? null
		]
	);
}

async function insertTombstone(database: SQLiteDBConnection, tombstone: Tombstone): Promise<void> {
	await database.run(`INSERT OR REPLACE INTO tombstones (id, deleted_at) VALUES (?, ?)`, [
		tombstone.id,
		tombstone.deletedAt
	]);
}

export class SqliteJournalRepository implements JournalRepository {
	async ensureReady(): Promise<void> {
		const database = await getDatabase();
		await migrateFromLocalStorage(database);
	}

	async loadAll(): Promise<Casting[]> {
		const database = await getDatabase();
		const result = await database.query(
			`SELECT id, created_at, locale, question, primary_hexagram, changed_hexagram,
				moving_lines, method, lines_json, coin_rows_json, note
			FROM readings
			ORDER BY created_at DESC`
		);

		const rows = (result.values ?? []) as ReadingRow[];
		return rows.map(rowToCasting);
	}

	async loadTombstones(): Promise<Tombstone[]> {
		const database = await getDatabase();
		const result = await database.query(`SELECT id, deleted_at FROM tombstones`);
		const rows = (result.values ?? []) as { id: string; deleted_at: string }[];
		return rows.map((r) => ({ id: r.id, deletedAt: r.deleted_at }));
	}

	async save(casting: Casting): Promise<void> {
		const database = await getDatabase();
		await insertCasting(database, casting);
	}

	async deleteByIds(ids: string[]): Promise<void> {
		if (ids.length === 0) return;

		const database = await getDatabase();
		const deletedAt = new Date().toISOString();
		const placeholders = ids.map(() => '?').join(', ');
		await database.run(`DELETE FROM readings WHERE id IN (${placeholders})`, ids);
		for (const id of ids) {
			await insertTombstone(database, { id, deletedAt });
		}
	}

	async replace(entries: Casting[], tombstones: Tombstone[]): Promise<void> {
		const database = await getDatabase();
		await database.execute(`DELETE FROM readings; DELETE FROM tombstones;`);
		for (const casting of [...entries].reverse()) {
			await insertCasting(database, casting);
		}
		for (const tombstone of mergeTombstones(tombstones)) {
			await insertTombstone(database, tombstone);
		}
	}
}
