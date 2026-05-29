import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'gd.eggs.aiching',
	appName: 'І-Цзин',
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
