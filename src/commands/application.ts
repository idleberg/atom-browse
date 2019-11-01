import { platform } from 'os';
import { dirname, resolve } from 'path';
import findUp from 'find-up';
import { showFolder } from '../util';

const appFolder = async (): Promise<void> => {
  const execPath = dirname(resolve(process.execPath));
  let appFolder;

  switch (platform()) {
    case 'darwin':
      const plist = findUp.sync('Resources', {cwd: execPath, type: 'directory'});
      appFolder = plist ? dirname(plist) : '';
      break;
    default:
      appFolder = execPath;
  }

  showFolder(appFolder);
};

export default appFolder;
