<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import { AppButton, AppPopup, FieldLabel } from '$lib/components/ui';
	import HexagramPicker from './HexagramPicker.svelte';
	import HexagramPickerDialog from './HexagramPickerDialog.svelte';

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

	let primaryNumber = $state<number | null>(null);
	let relatingNumber = $state<number | null>(null);
	let activePicker = $state<PickerTarget | null>(null);
	let error = $state<string | null>(null);
	let submitting = $state(false);

	function closePopup(): void {
		error = null;
		activePicker = null;
		primaryNumber = null;
		relatingNumber = null;
		onClose();
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
		if (open) {
			error = null;
			activePicker = null;
		}
	});
</script>

<AppPopup
	{open}
	title={i18n.t('flow.formReady')}
	titleId="prefilled-cast-popup"
	size="wide"
	onClose={closePopup}
>
	{#snippet children()}
		<form
			id="prefilled-cast-form"
			class="form"
			onsubmit={(event) => {
				event.preventDefault();
				void handleSubmit();
			}}
		>
			<label class="field">
				<FieldLabel>{i18n.t('flow.yourQuestion')}</FieldLabel>
				<textarea
					value={question}
					placeholder={i18n.t('flow.contextPlaceholder')}
					rows="3"
					oninput={(event) => onQuestionInput(event.currentTarget.value)}
				></textarea>
			</label>

			<fieldset class="answer-group">
				<FieldLabel asLegend>{i18n.t('flow.ichingAnswer')}</FieldLabel>
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
		</form>
	{/snippet}

	{#snippet footer()}
		<AppButton variant="primary" type="submit" form="prefilled-cast-form" disabled={submitting}>
			{i18n.t('flow.manualSubmit')}
		</AppButton>
	{/snippet}
</AppPopup>

<HexagramPickerDialog
	open={activePicker === 'primary'}
	title={i18n.t('reading.entryHexagramLabel')}
	titleId="hex-picker-primary"
	value={primaryNumber}
	onSelect={selectHexagram}
	onClose={closePicker}
/>
<HexagramPickerDialog
	open={activePicker === 'relating'}
	title={i18n.t('reading.relatingLabel')}
	titleId="hex-picker-relating"
	value={relatingNumber}
	onSelect={selectHexagram}
	onClose={closePicker}
/>

<style>
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.field {
		display: block;
	}

	.answer-group {
		margin: 0;
		padding: 0;
		border: none;
		min-width: 0;
	}

	.hex-fields {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.error {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--line-changing);
	}
</style>
