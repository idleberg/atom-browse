import { dirname, resolve } from 'path';
import { showFolder } from '../util';

const appFolder = async (): Promise<void> => {
  const appFolder: string = dirname(resolve(process.execPath));

  showFolder('Application Folder', appFolder);
};

export default appFolder;
