import { browser } from '$app/environment';
import { Capacitor } from '@capacitor/core';
import { initializeApp, type FirebaseApp } from 'firebase/app';

// Web client config. Not secret — the same identifiers ship in the native
// GoogleService-Info.plist / google-services.json. Native builds initialise
// Firebase from those bundled files; the web/PWA build needs this explicit call.
const firebaseConfig = {
	apiKey: 'AIzaSyARXKT8AL83opWmmKXuQ3SKtwF8hY6XDS4',
	authDomain: 'aiching-9bbf6.firebaseapp.com',
	databaseURL: 'https://aiching-9bbf6-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'aiching-9bbf6',
	storageBucket: 'aiching-9bbf6.firebasestorage.app',
	messagingSenderId: '353777145779',
	appId: '1:353777145779:web:f1d1ef868ec1c4dcb9ddc6',
	measurementId: 'G-LVWYH1Y06R'
};

/** Journal sync (Realtime Database) is inert until `databaseURL` is set. */
export const SYNC_ENABLED = firebaseConfig.databaseURL.length > 0;

/**
 * Web-only Firebase app. `null` during prerender and on native platforms
 * (native uses its own bundled config).
 */
export const firebaseApp: FirebaseApp | null =
	browser && !Capacitor.isNativePlatform() ? initializeApp(firebaseConfig) : null;

/** The `authDomain` above (`*.firebaseapp.com`) hosts the OAuth handler. GitHub Pages
 * cannot serve `/__/auth/handler`, so web sign-in bounces through that domain. */
