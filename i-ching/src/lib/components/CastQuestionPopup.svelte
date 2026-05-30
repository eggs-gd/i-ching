<script lang="ts">
	import type { TossMode } from '$lib/i-ching/types';
	import { AppButton, AppPopup, FieldLabel } from '$lib/components/ui';
	import { useI18n } from '$lib/i18n';

	interface Props {
		open: boolean;
		mode: TossMode;
		question: string;
		onClose: () => void;
		onCast: (mode: TossMode, question: string) => void;
	}

	let { open, mode, question, onClose, onCast }: Props = $props();

	const i18n = useI18n();
	let draft = $state('');

	const draftReady = $derived(Boolean(draft.trim()));

	$effect(() => {
		if (open) {
			draft = question;
		}
	});

	function closePopup(): void {
		onClose();
	}

	function confirmCast(): void {
		const trimmed = draft.trim();
		if (!trimmed) return;
		onCast(mode, trimmed);
	}
</script>

<AppPopup
	{open}
	title={i18n.t('flow.contextLabel')}
	titleId="cast-question-popup"
	onClose={closePopup}
	closeLabel={i18n.t('reading.helpClose')}
>
	{#snippet children()}
		<label class="field">
			<FieldLabel>{i18n.t('flow.questionInputLabel')}</FieldLabel>
			<textarea
				bind:value={draft}
				placeholder={i18n.t('flow.contextPlaceholder')}
				rows="3"
			></textarea>
		</label>
	{/snippet}

	{#snippet footer()}
		<AppButton variant="primary" disabled={!draftReady} onclick={confirmCast}>
			{i18n.t('flow.castConfirm')}
		</AppButton>
	{/snippet}
</AppPopup>

<style>
	.field {
		display: block;
		margin: 0;
	}

	.field :global(.field-label) {
		margin-bottom: var(--space-2);
	}

	textarea {
		font-family: var(--font-sans);
		font-weight: 300;
		font-size: var(--text-base);
		line-height: var(--leading-normal);
		color: var(--text);
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--space-3) var(--space-4);
		width: 100%;
		resize: none;
	}

	textarea:focus {
		outline: none;
		border-color: var(--accent-dim);
	}
</style>
