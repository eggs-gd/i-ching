<script lang="ts">
	import { shareText, writeClipboardText } from '@eggs/kit/native';
	import { AppButton, AppFullscreen, AppPopup } from '$lib/components/ui';
	import { archiveFilename, buildArchiveMarkdown } from '$lib/i-ching/export';
	import type { Casting } from '$lib/i-ching/types';
	import { getLocaleDateFormat, useI18n } from '$lib/i18n';
	import { track } from '$lib/analytics';

	interface Props {
		open: boolean;
		journal: Casting[];
		onClose: () => void;
	}

	let { open, journal, onClose }: Props = $props();

	const i18n = useI18n();
	const dateLocale = $derived(getLocaleDateFormat(i18n.locale));

	let previewOpen = $state(false);
	let previewText = $state('');
	let previewFilename = $state('');
	let copied = $state(false);

	function closeSettings(): void {
		onClose();
		copied = false;
	}

	async function exportArchive(): Promise<void> {
		if (!journal.length) return;

		const md = buildArchiveMarkdown(journal, dateLocale);
		const filename = archiveFilename();

		track('archive_exported', { entries: journal.length });
		onClose();

		// Native: system share sheet. Web/PWA: shareText is a no-op → preview
		// with Download / Copy (Web Share is a bad fit for archive files).
		if (await shareText({ title: filename, text: md })) return;

		previewText = md;
		previewFilename = filename;
		previewOpen = true;
		copied = false;
	}

	function download(): void {
		const blob = new Blob([previewText], { type: 'text/plain; charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = previewFilename;
		document.body.appendChild(a);
		a.click();
		setTimeout(() => {
			URL.revokeObjectURL(url);
			a.remove();
		}, 2000);
	}

	async function copy(): Promise<void> {
		try {
			await writeClipboardText(previewText);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {}
	}
</script>

<AppPopup
	{open}
	title={i18n.t('journal.exportTitle')}
	titleId="journal-export-title"
	onClose={closeSettings}
>
	{#snippet children()}{/snippet}

	{#snippet footer()}
		<AppButton variant="primary" disabled={journal.length === 0} onclick={() => void exportArchive()}>
			{i18n.t('journal.exportAction')}
		</AppButton>
	{/snippet}
</AppPopup>

<AppFullscreen
	open={previewOpen}
	title={previewFilename || i18n.t('journal.exportShare')}
	titleId="journal-export-preview-title"
	onClose={() => (previewOpen = false)}
>
	{#snippet children()}
		<div class="export-preview">
			<div class="export-actions">
				<AppButton variant="secondary" onclick={download}>
					{i18n.t('journal.exportDownload')}
				</AppButton>
				<AppButton variant="secondary" onclick={() => void copy()}>
					{copied ? i18n.t('journal.exportCopied') : i18n.t('journal.exportCopy')}
				</AppButton>
			</div>
			<pre class="export-text">{previewText}</pre>
		</div>
	{/snippet}
</AppFullscreen>

<style>
	.export-preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		width: 100%;
		max-width: var(--content-max-width);
		margin: 0 auto;
	}

	.export-actions {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-2);
	}

	.export-text {
		margin: 0;
		padding: var(--space-3);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--fill-muted);
		color: var(--text-soft);
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: var(--text-sm);
		line-height: var(--leading-normal);
		white-space: pre-wrap;
		word-break: break-word;
		overflow-x: auto;
	}
</style>
