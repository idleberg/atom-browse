export async function resourcesFolder(): Promise<void> {
	const { showFolder } = await import('../util');

	// @ts-ignore
	const resourcesFolder: string = atom.commandInstaller.getResourcesDirectory();

	showFolder({
		name: 'Resources Folder',
		path: resourcesFolder,
	});
}
