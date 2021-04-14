import { basename } from 'path';
import { constants, promises as fs } from 'fs';
import { platform } from 'os';
import { promisify } from 'util';
import { shell } from 'electron';
import { spawn } from 'child_process';
import console from './log';

const spawnAsync = promisify(spawn);

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
    console.error('[browse]', error);

    return false;
  }

  return stats.isDirectory();
}

async function isFile(pathName: string): Promise<boolean> {
  let stats;

  try {
    stats = await fs.lstat(pathName);
  } catch (error) {
    console.error('[browse]', error);

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

async function showFolder(options: ShowFolderOptions): Promise<void> {
  if (!options.path.length || !await folderExists(options.path)) return;

  const fileManager = getConfig('customFileManager.fullPath');

  if (fileManager) {
    let openArgs = getConfig('customFileManager.openArgs');

    if (openArgs.length > 0) {
      if (openArgs.includes('%path%')) {
        const index = openArgs.indexOf('%path%');

        openArgs[index] = openArgs[index].replace('%path%', options.path);
      } else {
        openArgs.push(options.path);
      }
    } else {
      openArgs = [ options.path ];
    }

    if (!options.silent) info(options.message
      ? String(options.message)
      : `**browse**: Opening '${options.name}' in custom file manager`
    );

    spawnAsync(fileManager, openArgs, {});
  } else {
    if (!options.silent) info(options.message
      ? String(options.message)
      : `**browse**: Opening '${options.name}' in ${getFileManager()}`
    );

    // @ts-ignore
    shell.openItem(options.path);
  }
}

async function showInFolder(options: ShowInFolderOptions): Promise<void> {
  if (!options.path.length || !(await fileExists(options.path))) return;

  const fileManager = getConfig('customFileManager.fullPath');

  if (fileManager) {
    let revealArgs = getConfig('customFileManager.revealArgs');

    if (revealArgs.length > 0) {
      if (revealArgs.includes('%path%')) {
        const index = revealArgs.indexOf('%path%');

        revealArgs[index] = revealArgs[index].replace('%path%', options.path);
      } else {
        revealArgs.push(options.path);
      }
    } else {
      revealArgs = [ options.path ];
    }

    if (!options.silent) info(options.message
      ? String(options.message)
      : `**browse**: Revealing \`${basename(options.path)}\` in custom file manager`
    );

    spawnAsync(fileManager, revealArgs, {});
  } else {
    if (!options.silent) info(options.message
      ? String(options.message)
      : `**browse**: Revealing \`${basename(options.path)}\` in ${getFileManager()}`
    );

    shell.showItemInFolder(options.path);
  }
}

function info(message: string, dismissable = false): void {
  if (getConfig('notify') === 'all') {
    atom.notifications.addInfo(message, {
      dismissable: dismissable,
      icon: 'check'
    });
  }

  console.info(`${message}`);
}

function warn(message: string, dismissable = false): void {
  if (getConfig('notify') !== 'none') {
    atom.notifications.addWarning(message, {
      dismissable: dismissable
    });
  }

  if (getConfig('beep')) atom.beep();
  console.warn(`${message}`);
}

export {
  folderExists,
  getConfig,
  getPackagesDirs,
  isDirectory,
  isFile,
  showFolder,
  showInFolder,
  warn
};
