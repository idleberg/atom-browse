import { promisify } from 'util';
import { basename } from 'path';
import { platform } from 'os';
// @ts-ignore
import { shell } from 'electron';
import { spawn } from 'child_process';

const spawnAsync = promisify(spawn);

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

const showFolder = async (filePath: string) => {
  if (!filePath.length) return;

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

    spawnAsync(fileManager, openArgs, {});
  } else {
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
  if (getConfig('notify')) {
    atom.notifications.addInfo(`**browse**: ${message}`, {
      dismissable: dismissable,
      icon: 'check'
    });
  }
};

const warn = (message: string, dismissable: boolean = false): void => {
  if (getConfig('notify')) {
    atom.notifications.addWarning(`**browse**: ${message}`, {
      dismissable: dismissable
    });
  }

  if (getConfig('beep')) atom.beep();
};

export {
  getConfig,
  getPackagesDirs,
  showFolder,
  showInFolder,
  warn
};
