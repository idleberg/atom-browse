import { spawn } from 'node:child_process';
import { constants, promises as fs } from 'node:fs';
import { platform } from 'node:os';
import { basename } from 'node:path';
import { shell } from 'electron';
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

function buildArgs(configArgs: string[], filePath: string): string[] {
	const args = [...configArgs];

	if (args.includes('%path%')) {
		const index = args.indexOf('%path%');
		args[index] = args[index].replace('%path%', filePath);
	} else {
		args.push(filePath);
	}

	return args;
}

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

export async function showFolder(options: ShowOptions): Promise<void> {
	if (!options.path.length || !(await folderExists(options.path))) return;

	const fileManager = getConfig('customFileManager.fullPath') as string;

	if (fileManager) {
		const openArgs = buildArgs(getConfig('customFileManager.openArgs') as string[], options.path);

		if (!options.silent && options.message?.length && options.name?.length) {
			info(options.message ?? `Opening '${options.name}' in custom file manager`);
		}

		execute(fileManager, openArgs);
	} else {
		if (!options.silent && options.message?.length && options.name?.length) {
			info(options.message ?? `Opening '${options.name}' in ${getFileManager()}`);
		}

		try {
			await shell.openPath(options.path);
		} catch {
			// @ts-expect-error We don't install types for Electron <9
			if ('openItem' in shell) shell.openItem(options.path);
		}
	}
}

export async function showInFolder(options: ShowOptions): Promise<void> {
	if (!options.path.length || !(await fileExists(options.path))) return;

	const fileManager = getConfig('customFileManager.fullPath') as string;

	if (fileManager) {
		const revealArgs = buildArgs(getConfig('customFileManager.revealArgs') as string[], options.path);

		if (!options.silent && options.message?.length) {
			info(options.message ?? `Revealing \`${basename(options.path)}\` in custom file manager`);
		}

		execute(fileManager, revealArgs);
	} else {
		if (!options.silent && options.message?.length) {
			info(options.message ?? `Revealing \`${basename(options.path)}\` in ${getFileManager()}`);
		}

		shell.showItemInFolder(options.path);
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
