import { dirname, resolve } from 'path';
import { showFolder } from '../util';

function apmFolder(): void {
  const configPath: string = dirname(atom.config.getUserConfigPath());
  const apmPath: string = resolve(configPath, '.apm');

  showFolder({
    name: '.apm Folder',
    path: apmPath
  });
}

export default apmFolder;
