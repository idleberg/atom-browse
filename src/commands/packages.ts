import { getPackagesDirs } from '../util';
import { showFolder } from '../util';

function packagesFolder(): void {
  const packagesDirs: string[] = getPackagesDirs();

  packagesDirs.map((packagesDir: string) => {
    showFolder('Packages Folder', packagesDir);
  });
}

export default packagesFolder;
