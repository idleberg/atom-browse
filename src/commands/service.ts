import console from '../log';

interface BrowseServicePayload {
	action?: 'open' | 'reveal';
	message?: string;
	silent?: boolean;
	target: string;
}

export async function browseService(payload: BrowseServicePayload): Promise<void> {
	const { isDirectory, isFile, showFolder, showInFolder } = await import('../util');

	if (typeof payload === 'string') {
		console.log('Auto-handle string input');

		payload = {
			action: (await isFile(payload)) ? 'reveal' : 'open',
			target: payload,
		};
	} else if (payload?.action && ['reveal', 'open'].includes(payload?.action)) {
		console.warn('payload.action is deprecated and can be omitted');
	}

	const targetPaths = Array.isArray(payload.target) ? payload.target : [payload.target];

	targetPaths.map(async (targetPath) => {
		if (typeof targetPath !== 'string') {
			console.warn(`Skipping: target path is of type ${typeof targetPath}, should be string`);
		}

		if (payload.action === 'reveal' || (await isFile(targetPath))) {
			showInFolder({
				path: targetPath,
				message: payload.message,
				silent: payload.silent,
			});
		} else if (payload.action === 'open' || (await isDirectory(targetPath))) {
			const { basename } = await import('path');

			showFolder({
				name: basename(targetPath),
				path: targetPath,
				message: payload.message,
				silent: payload.silent,
			});
		} else if (payload.action) {
			console.warn(`Action '${payload.action}' is not supported`);
		}
	});
}
