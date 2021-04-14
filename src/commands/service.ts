import { basename } from 'path';
import { isDirectory, isFile, showFolder, showInFolder } from '../util';
import console from '../log';

async function browseService(payload: BrowseServicePayload): Promise<void> {
  if (typeof payload === 'string') {
    console.log('Auto-handle string input');

    payload = {
      action: await isFile(payload)
        ? 'reveal'
        : 'open',
      target: payload
    }
  }

  const targetPaths = Array.isArray(payload.target)
    ? payload.target
    : [payload.target];

  targetPaths.map(async targetPath => {
    if (typeof targetPath !== 'string') {
      console.warn(`Skipping: target path is of type ${typeof targetPath}, should be string`);
    }

    if (payload.action === 'reveal' || await isFile(targetPath)) {
      showInFolder({
        path: targetPath,
        message: payload.message,
        silent: payload.silent
      })
    } else if (payload.action === 'open' || await isDirectory(targetPath)) {
      showFolder({
        name: basename(targetPath),
        path: targetPath,
        message: payload.message,
        silent: payload.silent
      });
    } else if (payload.action?.length) {
      console.warn(`Action '${payload.action}' is not supported`);
    }
  });
}

export default browseService;
