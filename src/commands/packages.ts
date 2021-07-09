async function packagesFolder(): Promise<void> {
  const { getPackagesDirs, showFolder } = await import('../util');

  const packagesDirs: string[] = getPackagesDirs();

  packagesDirs.map((packagesDir: string) => {
    showFolder({
      name: 'Packages Folder',
      path: packagesDir
    });
  });
}

export {
  packagesFolder
};
