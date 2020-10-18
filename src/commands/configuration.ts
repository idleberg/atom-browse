import { dirname } from 'path';
import { showFolder } from '../util';

function configFolder(): void {
  const configPath: string = dirname(atom.config.getUserConfigPath());

  showFolder('Configuration Folder', configPath);
}

export default configFolder;
