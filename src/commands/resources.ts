export async function resourcesFolder(): Promise<void> {
	const { showFolder } = await import('../util');

	// @ts-expect-error Types are not up-to-date
	const resourcesFolder: string = atom.commandInstaller.getResourcesDirectory();

	showFolder({
		name: 'Resources Folder',
		path: resourcesFolder,
	});
}
