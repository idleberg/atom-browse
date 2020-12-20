import { dirname } from 'path';
import { showFolder } from '../util';

function configFolder(): void {
  const configPath: string = dirname(atom.config.getUserConfigPath());

  showFolder({
    name: 'Configuration Folder',
    path: configPath
  });
}

export default configFolder;
