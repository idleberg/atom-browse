import { getPackagesDirs } from '../util';
import { showFolder } from '../util';

function packagesFolder(): void {
  const packagesDirs: string[] = getPackagesDirs();

  packagesDirs.map((packagesDir: string) => {
    showFolder({
      name: 'Packages Folder',
      path: packagesDir
    });
  });
}

export default packagesFolder;
