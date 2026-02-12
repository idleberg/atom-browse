export async function packagesFolder(): Promise<void> {
	const { getPackagesDirs, showFolder } = await import('../util');

	const packagesDirs: string[] = getPackagesDirs();

	for (const packagesDir of packagesDirs) {
		showFolder({
			name: 'Packages Folder',
			path: packagesDir,
		});
	}
}
