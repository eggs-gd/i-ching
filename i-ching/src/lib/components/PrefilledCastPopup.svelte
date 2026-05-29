<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import HexagramPicker from './HexagramPicker.svelte';
	import HexagramPickerOverlay from './HexagramPickerOverlay.svelte';

	type PickerTarget = 'primary' | 'relating';

	interface Props {
		open: boolean;
		question: string;
		onQuestionInput: (value: string) => void;
		onClose: () => void;
		onSubmit: (params: {
			question: string;
			primaryNumber: number;
			relatingNumber?: number;
		}) => boolean | Promise<boolean>;
	}

	let { open, question, onQuestionInput, onClose, onSubmit }: Props = $props();

	const i18n = useI18n();

	let dialog = $state<HTMLDialogElement | null>(null);
	let primaryNumber = $state<number | null>(null);
	let relatingNumber = $state<number | null>(null);
	let activePicker = $state<PickerTarget | null>(null);
	let error = $state<string | null>(null);
	let submitting = $state(false);

	const pickerMode = $derived(activePicker !== null);

	function blurActiveElement(): void {
		const active = document.activeElement;
		if (active instanceof HTMLElement) {
			active.blur();
		}
	}

	function closePopup(): void {
		error = null;
		activePicker = null;
		primaryNumber = null;
		relatingNumber = null;
		onClose();
		if (dialog?.open) {
			dialog.close();
		}
		requestAnimationFrame(blurActiveElement);
	}

	function openPicker(target: PickerTarget): void {
		activePicker = target;
		error = null;
	}

	function closePicker(): void {
		activePicker = null;
	}

	function selectHexagram(number: number): void {
		if (activePicker === 'primary') {
			primaryNumber = number;
		} else if (activePicker === 'relating') {
			relatingNumber = number;
		}
		closePicker();
	}

	async function handleSubmit(): Promise<void> {
		if (submitting) return;

		if (!question.trim()) {
			error = i18n.t('flow.manualQuestionRequired');
			return;
		}

		if (primaryNumber === null || primaryNumber < 1 || primaryNumber > 64) {
			error = i18n.t('flow.manualPrimaryInvalid');
			return;
		}

		submitting = true;
		error = null;

		try {
			const ok = await onSubmit({
				question: question.trim(),
				primaryNumber,
				relatingNumber: relatingNumber ?? undefined
			});

			if (!ok) {
				error = i18n.t('flow.manualSubmitFailed');
				return;
			}

			closePopup();
		} finally {
			submitting = false;
		}
	}

	$effect(() => {
		if (!dialog) return;
		if (open && !dialog.open) {
			error = null;
			activePicker = null;
			dialog.showModal();
			requestAnimationFrame(blurActiveElement);
		} else if (!open && dialog.open) {
			dialog.close();
			requestAnimationFrame(blurActiveElement);
		}
	});

	$effect(() => {
		document.documentElement.classList.toggle('hex-picker-open', pickerMode);
		return () => document.documentElement.classList.remove('hex-picker-open');
	});
</script>

<dialog
	bind:this={dialog}
	class="popup"
	class:popup--picker={pickerMode}
	tabindex="-1"
	onclose={closePopup}
	onclick={(event) => {
		if (pickerMode) return;
		if (event.target === dialog) closePopup();
	}}
>
	{#if activePicker === 'primary'}
		<HexagramPickerOverlay
			title={i18n.t('reading.entryHexagramLabel')}
			value={primaryNumber}
			onSelect={selectHexagram}
			onBack={closePicker}
		/>
	{:else if activePicker === 'relating'}
		<HexagramPickerOverlay
			title={i18n.t('reading.relatingLabel')}
			value={relatingNumber}
			onSelect={selectHexagram}
			onBack={closePicker}
		/>
	{:else}
		<form
			class="form"
			onsubmit={(event) => {
				event.preventDefault();
				void handleSubmit();
			}}
		>
			<label class="field">
				<span class="field-label">{i18n.t('flow.yourQuestion')}</span>
				<textarea
					value={question}
					placeholder={i18n.t('flow.contextPlaceholder')}
					rows="3"
					oninput={(event) => onQuestionInput(event.currentTarget.value)}
				></textarea>
			</label>

			<fieldset class="answer-group">
				<legend class="field-label">{i18n.t('flow.ichingAnswer')}</legend>
				<div class="hex-fields">
					<HexagramPicker
						label={i18n.t('reading.entryHexagramLabel')}
						value={primaryNumber}
						onOpen={() => openPicker('primary')}
						onClear={() => (primaryNumber = null)}
					/>
					<HexagramPicker
						label={i18n.t('reading.relatingLabel')}
						value={relatingNumber}
						onOpen={() => openPicker('relating')}
						onClear={() => (relatingNumber = null)}
					/>
				</div>
			</fieldset>

			{#if error}
				<p class="error" role="alert">{error}</p>
			{/if}

			<div class="actions">
				<button type="button" class="secondary-btn" onclick={closePopup}>
					{i18n.t('reading.helpClose')}
				</button>
				<button type="submit" class="primary-btn" disabled={submitting}>
					{i18n.t('flow.manualSubmit')}
				</button>
			</div>
		</form>
	{/if}
</dialog>

<style>
	.popup {
		width: min(24rem, calc(100% - 2.5rem));
		max-width: calc(100dvw - 2.5rem);
		padding: 1.25rem 1.25rem 1rem;
		border: 1px solid var(--border);
		border-radius: 2px;
		background: var(--bg-paper);
		color: var(--text);
		outline: none;
	}

	.popup--picker {
		width: 100%;
		max-width: 100%;
		height: 100dvh;
		max-height: 100dvh;
		margin: 0;
		padding: calc(1rem + env(safe-area-inset-top, 0px))
			calc(1rem + env(safe-area-inset-right, 0px))
			calc(1rem + env(safe-area-inset-bottom, 0px))
			calc(1rem + env(safe-area-inset-left, 0px));
		border: none;
		border-radius: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: var(--bg);
	}

	.popup--picker :global(.select-view) {
		flex: 1;
		min-height: 0;
	}

	.popup::backdrop {
		background: rgba(8, 7, 6, 0.72);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.field {
		display: block;
	}

	.field-label {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
	}

	.answer-group {
		margin: 0;
		padding: 0;
		border: none;
		min-width: 0;
	}

	.answer-group .field-label {
		margin-bottom: 0.75rem;
		padding: 0;
	}

	.hex-fields {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.error {
		margin: 0;
		font-size: 0.8rem;
		color: var(--line-changing);
	}

	.actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.primary-btn,
	.secondary-btn {
		padding: 0.75rem 0.5rem;
		border-radius: 2px;
		font: inherit;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		cursor: pointer;
		transition: all 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.primary-btn {
		border: 1px solid var(--accent-dim);
		background: var(--accent-dim);
		color: var(--bg);
	}

	.primary-btn:hover:not(:disabled) {
		background: var(--accent);
		border-color: var(--accent);
	}

	.primary-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.secondary-btn {
		border: 1px solid var(--border);
		background: none;
		color: var(--text-muted);
	}

	.secondary-btn:hover {
		border-color: var(--accent-dim);
		color: var(--text);
	}

	.primary-btn:focus,
	.secondary-btn:focus {
		outline: none;
	}
</style>
