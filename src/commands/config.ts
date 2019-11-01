import { dirname } from 'path';
import { showFolder } from '../util';

const configFolder = (): void => {
  const configPath = dirname(atom.config.getUserConfigPath());

  showFolder(configPath);
};

export default configFolder;
