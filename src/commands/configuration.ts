export async function configFolder(): Promise<void> {
	const { dirname } = await import('path');
	const { showFolder } = await import('../util');

	const configPath: string = dirname(atom.config.getUserConfigPath());

	showFolder({
		name: 'Configuration Folder',
		path: configPath,
	});
}
