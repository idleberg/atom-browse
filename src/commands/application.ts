import { dirname, resolve } from 'node:path';
import { PLATFORM } from '../util';

export async function appFolder(): Promise<void> {
	const { getConfig, showFolder } = await import('../util');
	const findUp = await import('find-up');

	const execPath = dirname(resolve(process.execPath));
	let appFolder: string;

	if (PLATFORM === 'darwin' && getConfig('openAppPackage')) {
		const resFolder = findUp.sync('Resources', { cwd: execPath, type: 'directory' });

		appFolder = resFolder ? dirname(resFolder) : execPath;
	} else {
		appFolder = execPath;
	}

	showFolder({
		name: 'Application Folder',
		path: appFolder,
	});
}
