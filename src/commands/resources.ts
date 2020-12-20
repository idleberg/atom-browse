import { showFolder } from '../util';

async function appFolder(): Promise<void> {
  // @ts-ignore
  const appFolder: string = atom.commandInstaller.getResourcesDirectory();

  showFolder({
    name: 'Resources Folder',
    path: appFolder
  });
}

export default appFolder;
