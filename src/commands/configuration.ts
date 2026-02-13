import { dirname } from 'node:path';

export async function configFolder(): Promise<void> {
	const { showFolder } = await import('../util');

	const configPath: string = dirname(atom.config.getUserConfigPath());

	showFolder({
		name: 'Configuration Folder',
		path: configPath,
	});
}
