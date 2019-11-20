import { getPackagesDirs } from '../util';
import { showFolder } from '../util';

const packagesFolder = (): void => {
  const packagesDirs: string[] = getPackagesDirs();

  packagesDirs.forEach((packagesDir: string) => {
    // TODO: isDir && dirExists
    showFolder('Packages Folder', packagesDir);
  });
};

export default packagesFolder;
