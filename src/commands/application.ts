import { platform } from 'os';
import { dirname, resolve } from 'path';
import findUp from 'find-up';
import { getConfig, showFolder } from '../util';

async function appFolder(): Promise<void> {
  const execPath = dirname(resolve(process.execPath));
  let appFolder;

  if (platform() === 'darwin' && getConfig('openAppPackage')) {
    const resFolder = findUp.sync('Resources', {cwd: execPath, type: 'directory'});

    appFolder = resFolder
      ? dirname(resFolder)
      : execPath;
  } else {
    appFolder = execPath;
  }

  showFolder('Application Folder', appFolder);
}

export default appFolder;
