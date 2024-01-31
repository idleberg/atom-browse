import { basename } from 'path';
import { constants, promises as fs } from 'fs';
import { platform } from 'os';
import { promisify } from 'util';
import { shell } from 'electron';
import { spawn } from 'child_process';
import console from './log';
import { name } from '../package.json';

const spawnAsync = promisify(spawn);

interface ShowOptions {
  message?: string;
  name?: string;
  path: string;
  silent?: boolean;
}

async function fileExists(pathName: string): Promise<boolean> {
  try {
    await fs.access(pathName, constants.F_OK);
  } catch (error) {
    console.warn(`Skipping '${pathName}' – not found`);

    return false;
  }

  return true;
}

async function isDirectory(pathName: string): Promise<boolean> {
  let stats;

  try {
    stats = await fs.lstat(pathName);
  } catch (error) {
    console.error(error);

    return false;
  }

  return stats.isDirectory();
}

async function isFile(pathName: string): Promise<boolean> {
  let stats;

  try {
    stats = await fs.lstat(pathName);
  } catch (error) {
    console.error(error);

    return false;
  }

  return stats.isFile();
}

async function folderExists(pathName: string): Promise<boolean> {
  let stats;

  try {
    stats = await fs.stat(pathName);
  } catch (error) {
    console.warn(`Skipping '${pathName}' – not found`);

    return false;
  }

  return stats.isDirectory();
}

const getAppName = (): string => {
  return atom.getAppName().split(' ')[0];
}

const getConfig = (key = ''): any => {
  return atom.config.get(`browse.${key}`);
}

const getPackagesDirs = (): string[] => {
  const packageDirs: string[] = atom.packages.getPackageDirPaths();

  return packageDirs.filter( (val: string) => !val.includes('app.asar') );
}

const getFileManager = (): string => {
  switch (platform()) {
    case 'darwin':
      return 'Finder';
    case 'win32':
      return 'Explorer';
    default:
      return 'file manager';
  }
}

async function showFolder(options: ShowOptions | string): Promise<void> {
  const filePath = typeof options === 'string'
    ? options
    : options.path;

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

    if (typeof options !== 'string' && !options?.silent && options?.message?.length && options?.name?.length) {
      info(options.message
        ? String(options.message)
        : `Opening '${options.name}' in custom file manager`
      );
    }

    spawnAsync(fileManager, openArgs, {});
  } else {
    if (typeof options !== 'string' && !options?.silent && options?.message?.length && options?.name?.length) {
      info(options.message
        ? String(options.message)
        : `Opening '${options.name}' in ${getFileManager()}`
      );
    }

    try {
      await shell.openPath(filePath);
    } catch (err) {
      // Electron <9
      if (shell['openItem']) shell['openItem'](filePath);
    }
  }
}

async function showInFolder(options: ShowOptions | string): Promise<void> {
  const filePath = typeof options === 'string'
    ? options
    : options.path;

  if (!filePath.length || !(await fileExists(filePath))) return;

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

    if (typeof options !== 'string' && !options?.silent && options?.message?.length) {
      info(options.message
        ? String(options.message)
        : `Revealing \`${basename(filePath)}\` in custom file manager`
      );
    }

    spawnAsync(fileManager, revealArgs, {});
  } else {
    if (typeof options !== 'string' && !options?.silent && options?.message?.length) {
      info(options.message
        ? String(options.message)
        : `Revealing \`${basename(filePath)}\` in ${getFileManager()}`
      );
    }

    shell.showItemInFolder(filePath);
  }
}

function info(message: string, dismissable = false): void {
  if (getConfig('notify') === 'all') {
    atom.notifications.addInfo(`**${name}** ${message}`, {
      dismissable: dismissable,
      icon: 'check'
    });
  }

  console.info(`${message}`);
}

function warn(message: string, dismissable = false): void {
  if (getConfig('notify') !== 'none') {
    atom.notifications.addWarning(`**${name}** ${message}`, {
      dismissable: dismissable
    });
  }

  if (getConfig('beep')) atom.beep();
  console.warn(`${message}`);
}

export {
  folderExists,
  getAppName,
  getConfig,
  getPackagesDirs,
  isDirectory,
  isFile,
  showFolder,
  showInFolder,
  warn
};
