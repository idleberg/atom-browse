import { homedir, platform } from 'os';
import { resolve } from 'path';
import { showFolder } from '../util';

const appDataFolder = async (): Promise<void> => {
  let appDataFolder;

  switch (platform()) {
    case 'darwin':
      appDataFolder = resolve(homedir(), 'Library', 'Application Support', 'Atom');
      break;
    case 'win32':
      appDataFolder = (process.env.APPDATA) ? resolve(process.env.APPDATA, 'Atom') : '';
      break;
    default:
      appDataFolder = resolve(homedir(), '.config', 'Atom');
      break;
  }

  showFolder('App Data Folder', appDataFolder);
};

export default appDataFolder;
