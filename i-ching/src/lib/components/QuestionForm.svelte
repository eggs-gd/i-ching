<script lang="ts">
	import type { TossMode } from '$lib/i-ching/types';
	import { useI18n } from '$lib/i18n';

	interface Props {
		question: string;
		onQuestionInput: (value: string) => void;
		onStartCast: (mode: TossMode) => void;
	}

	let { question, onQuestionInput, onStartCast }: Props = $props();

	const i18n = useI18n();
	const tossModes: TossMode[] = ['single', 'line', 'all'];
	const castModeLabels: Record<TossMode, string> = {
		single: 'flow.castSingle',
		line: 'flow.castLine',
		all: 'flow.castFull'
	};
</script>

<section class="step question-step">
	<label class="field">
		<span class="field-label">{i18n.t('flow.contextLabel')}</span>
		<textarea
			value={question}
			placeholder={i18n.t('flow.contextPlaceholder')}
			rows="3"
			oninput={(event) => onQuestionInput(event.currentTarget.value)}
		></textarea>
	</label>

	<div class="casting">
		<p class="casting-label">{i18n.t('flow.castingLabel')}</p>
		<div class="casting-options">
			{#each tossModes as mode}
				<button
					type="button"
					class="cast-btn"
					disabled={!question.trim()}
					onclick={() => onStartCast(mode)}
				>
					{i18n.t(castModeLabels[mode])}
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	.step {
		margin-bottom: 2rem;
	}

	.field {
		display: block;
		margin-bottom: 1.5rem;
	}

	.field-label,
	.casting-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
	}

	.field-label {
		display: block;
		margin-bottom: 0.5rem;
	}

	.casting-label {
		margin: 0 0 0.75rem;
	}

	.casting-options {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
	}

	.cast-btn {
		padding: 0.85rem 0.5rem;
		border: 1px solid var(--accent-dim);
		border-radius: 2px;
		background: rgba(196, 165, 116, 0.08);
		color: var(--accent);
		font: inherit;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.cast-btn:hover:not(:disabled) {
		background: var(--accent-dim);
		color: var(--bg);
		border-color: var(--accent-dim);
	}

	.cast-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
</style>
