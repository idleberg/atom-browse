import { spawn } from 'node:child_process';
import { platform } from 'node:os';
import { basename } from 'node:path';
import { shell } from 'electron';
import { constants, promises as fs } from 'fs';
import { name } from '../package.json';
import console from './log';

interface ShowOptions {
	message?: string;
	name?: string;
	path: string;
	silent?: boolean;
}

export const PLATFORM = platform();

function execute(command: string, args: string[]): void {
	spawn(command, args, { detached: true, stdio: 'ignore' }).unref();
}

export async function fileExists(pathName: string): Promise<boolean> {
	try {
		await fs.access(pathName, constants.F_OK);
	} catch {
		console.warn(`Skipping '${pathName}' – not found`);

		return false;
	}

	return true;
}

export async function isDirectory(pathName: string): Promise<boolean> {
	try {
		const stats = await fs.lstat(pathName);

		return stats.isDirectory();
	} catch {
		return false;
	}
}

export async function isFile(pathName: string): Promise<boolean> {
	try {
		const stats = await fs.lstat(pathName);

		return stats.isFile();
	} catch {
		return false;
	}
}

export async function folderExists(pathName: string): Promise<boolean> {
	try {
		const stats = await fs.stat(pathName);

		return stats.isDirectory();
	} catch {
		console.warn(`Skipping '${pathName}' – not found`);

		return false;
	}
}

export const getAppName = (): string => {
	return atom.getAppName().split(' ')[0] || '';
};

export const getConfig = (key = ''): Record<string, unknown> | unknown => {
	return atom.config.get(`browse.${key}`);
};

export const getPackagesDirs = (): string[] => {
	const packageDirs: string[] = atom.packages.getPackageDirPaths();

	return packageDirs.filter((val: string) => !val.includes('app.asar'));
};

const getFileManager = (): string => {
	switch (PLATFORM) {
		case 'darwin':
			return 'Finder';

		case 'win32':
			return 'Explorer';

		default:
			return 'file manager';
	}
};

export async function showFolder(options: ShowOptions | string): Promise<void> {
	const filePath = typeof options === 'string' ? options : options.path;

	if (!filePath.length || !(await folderExists(filePath))) return;

	const fileManager = getConfig('customFileManager.fullPath') as string;

	if (fileManager) {
		let openArgs = getConfig('customFileManager.openArgs') as string[];

		if (openArgs.length > 0) {
			if (openArgs.includes('%path%')) {
				const index = openArgs.indexOf('%path%');

				openArgs[index] = openArgs[index].replace('%path%', filePath);
			} else {
				openArgs.push(filePath);
			}
		} else {
			openArgs = [filePath];
		}

		if (typeof options !== 'string' && !options?.silent && options?.message?.length && options?.name?.length) {
			info(options.message ? String(options.message) : `Opening '${options.name}' in custom file manager`);
		}

		execute(fileManager, openArgs);
	} else {
		if (typeof options !== 'string' && !options?.silent && options?.message?.length && options?.name?.length) {
			info(options.message ? String(options.message) : `Opening '${options.name}' in ${getFileManager()}`);
		}

		try {
			await shell.openPath(filePath);
		} catch {
			// @ts-expect-error We don't install types for Electron <9
			if ('openItem' in shell) shell.openItem(filePath);
		}
	}
}

export async function showInFolder(options: ShowOptions | string): Promise<void> {
	const filePath = typeof options === 'string' ? options : options.path;

	if (!filePath.length || !(await fileExists(filePath))) return;

	const fileManager = getConfig('customFileManager.fullPath') as string;

	if (fileManager) {
		let revealArgs = getConfig('customFileManager.revealArgs') as string[];

		if (revealArgs.length > 0) {
			if (revealArgs.includes('%path%')) {
				const index = revealArgs.indexOf('%path%');

				revealArgs[index] = revealArgs[index].replace('%path%', filePath);
			} else {
				revealArgs.push(filePath);
			}
		} else {
			revealArgs = [filePath];
		}

		if (typeof options !== 'string' && !options?.silent && options?.message?.length) {
			info(options.message ? String(options.message) : `Revealing \`${basename(filePath)}\` in custom file manager`);
		}

		execute(fileManager, revealArgs);
	} else {
		if (typeof options !== 'string' && !options?.silent && options?.message?.length) {
			info(options.message ? String(options.message) : `Revealing \`${basename(filePath)}\` in ${getFileManager()}`);
		}

		shell.showItemInFolder(filePath);
	}
}

export function info(message: string, dismissable = false): void {
	if (getConfig('notify') === 'all') {
		atom.notifications.addInfo(`**${name}** ${message}`, {
			dismissable: dismissable,
			icon: 'check',
		});
	}

	console.info(`${message}`);
}

export function warn(message: string, dismissable = false): void {
	if (getConfig('notify') !== 'none') {
		atom.notifications.addWarning(`**${name}** ${message}`, {
			dismissable: dismissable,
		});
	}

	if (getConfig('beep')) atom.beep();
	console.warn(`${message}`);
}
