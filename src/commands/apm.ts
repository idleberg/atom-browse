import { dirname, resolve } from 'path';
import { showFolder } from '../util';

const apmFolder = (): void => {
  const configPath: string = dirname(atom.config.getUserConfigPath());
  const apmPath: string = resolve(configPath, '.apm');

  showFolder(apmPath);
};

export default apmFolder;
