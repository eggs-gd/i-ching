<script lang="ts">
	import { onMount } from 'svelte';
	import type { TossMode } from '$lib/i-ching/types';
	import { AppButton, FieldLabel } from '$lib/components/ui';
	import { useI18n } from '$lib/i18n';
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
	const tossModes: TossMode[] = ['single', 'line', 'all'];
	const castModeLabels: Record<TossMode, string> = {
		single: 'flow.castSingle',
		line: 'flow.castLine',
		all: 'flow.castFull'
	};

	let textareaEl = $state<HTMLTextAreaElement | null>(null);
	let manualPopupOpen = $state(false);

	export function focusInput(): void {
		textareaEl?.focus({ preventScroll: true });
	}

	onMount(() => {
		requestAnimationFrame(() => focusInput());
	});
</script>

<section class="step question-step">
	<label class="field">
		<FieldLabel>{i18n.t('flow.contextLabel')}</FieldLabel>
		<textarea
			bind:this={textareaEl}
			value={question}
			placeholder={i18n.t('flow.contextPlaceholder')}
			rows="3"
			oninput={(event) => onQuestionInput(event.currentTarget.value)}
		></textarea>
	</label>

	<div class="casting">
		<FieldLabel>{i18n.t('flow.castingLabel')}</FieldLabel>
		<div class="casting-options">
			{#each tossModes as mode}
				<AppButton
					variant="primary"
					primaryTone="soft"
					disabled={!question.trim()}
					onclick={() => onStartCast(mode)}
				>
					{i18n.t(castModeLabels[mode])}
				</AppButton>
			{/each}
		</div>

		<AppButton variant="secondary" fullWidth onclick={() => (manualPopupOpen = true)}>
			{i18n.t('flow.formReady')}
		</AppButton>
	</div>
</section>

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

	.casting-options {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-2);
		margin-bottom: var(--space-3);
	}
</style>
