export const SITE = 'https://iching.eggs.gd';
export const SITE_NAME = 'I Ching: Shape of Momentum';
export const OG_IMAGE = `${SITE}/og.png`;

export const HOME_TITLE = 'I Ching: Shape of Momentum — a symbolic reading';
export const HOME_DESCRIPTION =
	'A quiet modern reading companion for the I Ching. Cast coins, read the hexagram, and return later to see what keeps returning.';

export const jsonLdHome = {
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: SITE_NAME,
	url: `${SITE}/`,
	description: HOME_DESCRIPTION,
	applicationCategory: 'LifestyleApplication',
	operatingSystem: 'Web',
	inLanguage: ['en', 'uk'],
	isAccessibleForFree: true,
	publisher: { '@type': 'Organization', name: 'earwiG Games', url: 'https://eggs.gd/' }
};
