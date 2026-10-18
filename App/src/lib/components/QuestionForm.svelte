<script lang="ts">
	import type { TossMode } from '$lib/i-ching/types';
	import { AppButton, FieldLabel, InfoButton } from '$lib/components/ui';
	import { useI18n } from '$lib/i18n';
	import { track } from '$lib/analytics';
	import CastQuestionPopup from './CastQuestionPopup.svelte';
	import HelpPopup from './HelpPopup.svelte';
	import PrefilledCastPopup from './PrefilledCastPopup.svelte';

	interface Props {
		question: string;
		onQuestionInput: (value: string) => void;
		onStartCast: (mode: TossMode) => void;
		onManualCast: (params: {
			question: string;
			primaryNumber: number;
			relatingNumber?: number;
		}) => boolean | Promise<boolean>;
	}

	let { question, onQuestionInput, onStartCast, onManualCast }: Props = $props();

	const i18n = useI18n();
	const simulatedTossModes = ['single', 'line', 'all'] as const;
	const castModeLabels: Record<(typeof simulatedTossModes)[number], string> = {
		single: 'flow.castSingle',
		line: 'flow.castLine',
		all: 'flow.castFull'
	};

	let textareaEl = $state<HTMLTextAreaElement | null>(null);
	let manualPopupOpen = $state(false);
	let contextHelpOpen = $state(false);
	let virtualHelpOpen = $state(false);
	let realCoinsHelpOpen = $state(false);
	let pendingCastMode = $state<TossMode | null>(null);

	export function focusInput(): void {
		textareaEl?.focus({ preventScroll: true });
	}

	function startCast(mode: TossMode): void {
		track('cast_started', { method: mode });
		onStartCast(mode);
	}

	function requestCast(mode: TossMode): void {
		if (question.trim()) {
			startCast(mode);
			return;
		}
		pendingCastMode = mode;
	}

	function closeQuestionPopup(): void {
		pendingCastMode = null;
	}

	function castFromPopup(mode: TossMode, nextQuestion: string): void {
		onQuestionInput(nextQuestion);
		pendingCastMode = null;
		startCast(mode);
	}
</script>

<section class="step question-step">
	<label class="field">
		<div class="group-head">
			<FieldLabel>{i18n.t('flow.contextLabel')}</FieldLabel>
			<InfoButton
				label={i18n.t('flow.contextHelpTitle')}
				onclick={() => (contextHelpOpen = true)}
			/>
		</div>
		<textarea
			bind:this={textareaEl}
			value={question}
			placeholder={i18n.t('flow.contextPlaceholder')}
			rows="3"
			oninput={(event) => onQuestionInput(event.currentTarget.value)}
		></textarea>
	</label>

	<div class="casting">
		<div class="casting-title">
			<FieldLabel>{i18n.t('flow.castingLabel')}</FieldLabel>
		</div>

		<div class="casting-subsection">
			<div class="group-head">
				<FieldLabel size="row">{i18n.t('flow.virtualCoinsLabel')}</FieldLabel>
				<InfoButton
					label={i18n.t('flow.virtualCoinsHelpTitle')}
					onclick={() => (virtualHelpOpen = true)}
				/>
			</div>
			<div class="casting-options">
				{#each simulatedTossModes as mode}
					<AppButton
						variant="primary"
						primaryTone="soft"
						class="cast-btn"
						onclick={() => requestCast(mode)}
					>
						{i18n.t(castModeLabels[mode])}
					</AppButton>
				{/each}
			</div>
		</div>

		<div class="casting-subsection">
			<div class="group-head">
				<FieldLabel size="row">{i18n.t('flow.realCoinsLabel')}</FieldLabel>
				<InfoButton
					label={i18n.t('flow.realCoinsHelpTitle')}
					onclick={() => (realCoinsHelpOpen = true)}
				/>
			</div>
			<div class="casting-real-actions">
				<AppButton
					variant="primary"
					primaryTone="soft"
					class="cast-btn"
					onclick={() => requestCast('real')}
				>
					{i18n.t('flow.castSingle')}
				</AppButton>

				<AppButton
					variant="primary"
					primaryTone="soft"
					class="cast-btn"
					onclick={() => (manualPopupOpen = true)}
				>
					{i18n.t('flow.formReady')}
				</AppButton>
			</div>
		</div>
	</div>
</section>

{#if pendingCastMode}
	<CastQuestionPopup
		open={true}
		mode={pendingCastMode}
		{question}
		onClose={closeQuestionPopup}
		onCast={castFromPopup}
	/>
{/if}

<HelpPopup
	open={contextHelpOpen}
	title={i18n.t('flow.contextHelpTitle')}
	body={i18n.t('flow.contextHelpBody')}
	closeLabel={i18n.t('reading.helpClose')}
	onClose={() => (contextHelpOpen = false)}
/>

<HelpPopup
	open={virtualHelpOpen}
	title={i18n.t('flow.virtualCoinsHelpTitle')}
	body={i18n.t('flow.virtualCoinsHelpBody')}
	closeLabel={i18n.t('reading.helpClose')}
	onClose={() => (virtualHelpOpen = false)}
/>

<HelpPopup
	open={realCoinsHelpOpen}
	title={i18n.t('flow.realCoinsHelpTitle')}
	body={i18n.t('flow.realCoinsHelpBody')}
	closeLabel={i18n.t('reading.helpClose')}
	onClose={() => (realCoinsHelpOpen = false)}
/>

<PrefilledCastPopup
	open={manualPopupOpen}
	{question}
	{onQuestionInput}
	onClose={() => (manualPopupOpen = false)}
	onSubmit={onManualCast}
/>

<style>
	.step {
		margin-bottom: 2rem;
	}

	.field {
		display: block;
		margin-bottom: var(--space-5);
	}

	.field .group-head :global(.field-label) {
		margin-bottom: 0;
		flex: 1;
		min-width: 0;
	}

	.casting {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.casting-title :global(.field-label) {
		margin-bottom: 0;
	}

	.casting-subsection {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.group-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
	}

	.group-head :global(.field-label.row) {
		flex: 1;
		min-width: 0;
	}

	.casting-options {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-2);
	}

	.casting-real-actions {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-2);
	}

	:global(.btn.cast-btn) {
		text-align: center;
	}
</style>
