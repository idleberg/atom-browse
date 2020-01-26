import { basename } from 'path';
import { platform } from 'os';
import { promisify } from 'util';
// @ts-ignore
import { shell } from 'electron';
import { spawn } from 'child_process';
import { stat } from 'fs';

const spawnAsync = promisify(spawn);
const statAsync = promisify(stat);

const folderExists = async (pathName: string): Promise<boolean> => {
  let stats;

  try {
    stats = await statAsync(pathName);
  } catch (error) {
    if (atom.inDevMode()) console.warn(`browse: Skipping '${pathName}' – not found`);

    return false;
  }

  return stats.isDirectory();
};

const getConfig = (key: string = ''): any => {
  return atom.config.get(`browse.${key}`);
};

const getPackagesDirs = (): string[] => {
  const packageDirs: string[] = atom.packages.getPackageDirPaths();

  return packageDirs.filter( (val: string) => !val.includes('app.asar') );
};

const getFileManager = (): string => {
  switch (platform()) {
    case 'darwin':
      return 'Finder';
    case 'win32':
      return 'Explorer';
    default:
      return 'file manager';
  }
};

const showFolder = async (folderName: string, filePath: string) => {
  if (!filePath.length || !await folderExists(filePath)) return;

  const fileManager = getConfig('customFileManager.fullPath');

  if (fileManager) {
    let openArgs = getConfig('customFileManager.openArgs');

    if (openArgs.length > 0) {
      if (openArgs.includes('%path%')) {
        const index = openArgs.indexOf('%path%');

        openArgs[index] = openArgs[index].replace('%path%', filePath);
      } else {
        openArgs.push(filePath);
      }
    } else {
      openArgs = [ filePath ];
    }

    info(`Opening ${folderName} in custom file manager`);
    spawnAsync(fileManager, openArgs, {});
  } else {
    info(`Opening ${folderName} in ${getFileManager()}`);
    shell.openItem(filePath);
  }
};

const showInFolder = async (filePath: string) => {
  if (!filePath.length) return;

  const fileManager = getConfig('customFileManager.fullPath');

  if (fileManager) {
    let revealArgs = getConfig('customFileManager.revealArgs');

    if (revealArgs.length > 0) {
      if (revealArgs.includes('%path%')) {
        const index = revealArgs.indexOf('%path%');

        revealArgs[index] = revealArgs[index].replace('%path%', filePath);
      } else {
        revealArgs.push(filePath);
      }
    } else {
      revealArgs = [ filePath ];
    }

    info(`Revealing \`${basename(filePath)}\` in custom file manager`);
    spawnAsync(fileManager, revealArgs, {});
  } else {
    info(`Revealing \`${basename(filePath)}\` in ${getFileManager()}`);
    shell.showItemInFolder(filePath);
  }
};

const info = (message: string, dismissable: boolean = false): void => {
  if (getConfig('notify') === 'all') {
    atom.notifications.addInfo(`**browse**: ${message}`, {
      dismissable: dismissable,
      icon: 'check'
    });
  }
};

const warn = (message: string, dismissable: boolean = false): void => {
  if (getConfig('notify') !== 'none') {
    atom.notifications.addWarning(`**browse**: ${message}`, {
      dismissable: dismissable
    });
  }

  if (getConfig('beep')) atom.beep();
};

export {
  folderExists,
  getConfig,
  getPackagesDirs,
  showFolder,
  showInFolder,
  warn
};
