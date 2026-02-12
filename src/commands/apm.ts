import { dirname, resolve } from 'node:path';

export async function apmFolder(): Promise<void> {
	const { showFolder } = await import('../util');

	const configPath: string = dirname(atom.config.getUserConfigPath());
	const apmPath: string = resolve(configPath, '.apm');

	showFolder({
		name: '.apm Folder',
		path: apmPath,
	});
}
