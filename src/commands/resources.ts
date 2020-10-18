import { showFolder } from '../util';

async function appFolder(): Promise<void> {
  // @ts-ignore
  const appFolder: string = atom.commandInstaller.getResourcesDirectory();

  showFolder('Resources Folder', appFolder);
}

export default appFolder;
