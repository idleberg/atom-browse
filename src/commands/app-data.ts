import { homedir, platform } from 'os';
import { resolve } from 'path';

export async function appDataFolder(): Promise<void> {
	const { getAppName, showFolder } = await import('../util');

	const appName = getAppName();
	let appDataFolder: string;

	switch (platform()) {
		case 'darwin':
			appDataFolder = resolve(homedir(), 'Library', 'Application Support', appName);
			break;

		case 'win32':
			appDataFolder = process.env.APPDATA ? resolve(process.env.APPDATA, appName) : '';
			break;

		default:
			appDataFolder = resolve(homedir(), '.config', appName);
			break;
	}

	showFolder({
		name: 'App Data Folder',
		path: appDataFolder,
	});
}
