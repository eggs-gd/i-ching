<script lang="ts">
	import { base } from '$app/paths';

	const screenshots = [
		{
			src: 'appstore-01-reading.png',
			alt: 'Reading screen with primary and relating hexagrams'
		},
		{
			src: 'appstore-02-one-page.png',
			alt: 'Single continuous reading page'
		},
		{
			src: 'appstore-03-cast.png',
			alt: 'Traditional coin casting screen'
		},
		{
			src: 'appstore-04-extended.png',
			alt: 'Extended classical commentary screen'
		},
		{
			src: 'appstore-05-archive.png',
			alt: 'Personal archive of previous readings'
		}
	];

	const features = [
		'Traditional coin casting',
		'Manual hexagram input',
		'Short contemporary readings',
		'Extended classical commentary',
		'Personal archive of questions and readings',
		'English and Ukrainian localization',
		'No accounts required',
		'No social features',
		'No feeds',
		'No notifications'
	];
</script>

<svelte:head>
	<title>I Ching: Shape of Momentum</title>
	<meta
		name="description"
		content="A quiet modern reading companion for the I Ching. Cast coins, read the hexagram, and return later to see what keeps returning."
	/>
	<meta property="og:title" content="I Ching: Shape of Momentum" />
	<meta
		property="og:description"
		content="A quiet space for difficult questions. Cast coins, read the hexagram, return later and see what keeps returning."
	/>
</svelte:head>

<main class="page">
	<section class="intro" aria-labelledby="app-title">
		<div class="title-row">
			<p class="glyphs" aria-hidden="true">易經</p>
			<h1 id="app-title">I Ching: Shape of Momentum</h1>
		</div>
		<p class="promo">
			A quiet space for difficult questions.
			<br />
			Cast coins, read the hexagram, return later and see what keeps returning.
		</p>
	</section>

	<section class="screenshots" aria-label="App screenshots">
		{#each screenshots as screenshot}
			<img
				src="{base}/screenshots/{screenshot.src}"
				alt={screenshot.alt}
				width="1242"
				height="2688"
			/>
		{/each}
	</section>

	<section class="description" aria-label="App description">
		<p>Shape of Momentum is a modern reading companion for the I Ching.</p>

		<p>
			Built around calmness rather than distraction, it keeps the entire reading on a single
			continuous page: question, hexagram, transformation, interpretation and archive.
		</p>

		<p>Features:</p>

		<ul>
			{#each features as feature}
				<li>{feature}</li>
			{/each}
		</ul>

		<p>
			Whether the question is about work, relationships, decisions, business, a project or simply
			understanding the shape of the present moment, the reading remains accessible in one place and
			can be revisited later.
		</p>

		<p class="closing">
			One question.
			<br />
			One reading.
			<br />
			One page.
		</p>

		<div class="store-buttons" aria-label="Get the app">
			<a class="badge" aria-disabled="true">
				<svg class="badge-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M16.37 1.43c0 1.13-.42 2.19-1.12 2.98-.77.88-2.03 1.56-3.06 1.48-.13-1.1.42-2.26 1.09-3.01.77-.86 2.1-1.5 3.09-1.45zM20.9 17.1c-.55 1.27-.81 1.84-1.52 2.96-1 1.55-2.39 3.49-4.11 3.5-1.53.02-1.92-.98-3.99-.97-2.07.01-2.5.99-4.03.96-1.72-.01-3.04-1.76-4.03-3.32-2.77-4.35-3.06-9.46-1.35-12.18 1.21-1.94 3.13-3.07 4.93-3.07 1.84 0 3 .98 4.52.98 1.48 0 2.38-.98 4.51-.98 1.61 0 3.32.88 4.53 2.39-3.98 2.17-3.33 7.85.07 9.75z"
					/>
				</svg>
				<span class="badge-text">
					<small>Download on the</small>
					App Store
				</span>
			</a>
			<a class="badge" aria-disabled="true">
				<svg class="badge-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path
						d="M3.6 2.3a1 1 0 0 0-.6.92v17.56a1 1 0 0 0 .6.92l9.94-9.7zM14.94 12.94l2.63 2.57 3.44-1.9c.92-.5.92-1.72 0-2.22l-3.44-1.9zM13.9 11.9l2.44-2.38L5.58 3.2zM5.58 20.8l10.76-6.32-2.44-2.38z"
					/>
				</svg>
				<span class="badge-text">
					<small>Get it on</small>
					Google Play
				</span>
			</a>
			<a class="badge pwa" href="{base}/pwa/" rel="external">
				<svg
					class="badge-logo"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.8"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M12 3v11" />
					<path d="m8 10 4 4 4-4" />
					<path d="M4 20h16" />
				</svg>
				<span class="badge-text">
					<small>Open the</small>
					Web App
				</span>
			</a>
		</div>
	</section>

	<footer>
		<span>Copyright 2026 eGGs.gd</span>
		<a href="{base}/privacy">Privacy Policy</a>
	</footer>
</main>
