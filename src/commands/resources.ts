import { showFolder } from '../util';

const appFolder = async (): Promise<void> => {
  // @ts-ignore
  const appFolder: string = atom.commandInstaller.getResourcesDirectory();

  showFolder('Resources Folder', appFolder);
};

export default appFolder;
