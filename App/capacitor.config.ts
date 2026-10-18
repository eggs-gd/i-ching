import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'gd.eggs.aiching',
	appName: 'I Ching: Shape of Momentum',
	webDir: 'build',
	ios: {
		preferredContentMode: 'mobile'
	},
	server: {
		androidScheme: 'https'
	},
	plugins: {
		CapacitorSQLite: {
			iosIsEncryption: false,
			androidIsEncryption: false
		}
	}
};

export default config;
