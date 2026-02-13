import { basename } from 'node:path';
import console from '../log';

interface BrowseServicePayload {
	message?: string;
	silent?: boolean;
	target: string | string[];
}

interface BrowseTargetOptions {
	message?: string;
	silent?: boolean;
}

async function browseTarget(path: string, options?: BrowseTargetOptions): Promise<void> {
	const { isDirectory, isFile, showFolder, showInFolder } = await import('../util');

	if (await isFile(path)) {
		showInFolder({ path, ...options });
	} else if (await isDirectory(path)) {
		showFolder({ name: basename(path), path, ...options });
	}
}

export async function browseService(payload: BrowseServicePayload | string): Promise<void> {
	if (typeof payload === 'string') {
		return browseTarget(payload);
	}

	const targetPaths = Array.isArray(payload.target) ? payload.target : [payload.target];

	for (const targetPath of targetPaths) {
		if (typeof targetPath !== 'string') {
			console.warn(`Skipping: target path is of type ${typeof targetPath}, should be string`);
			continue;
		}

		await browseTarget(targetPath, { message: payload.message, silent: payload.silent });
	}
}
