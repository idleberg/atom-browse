import { basename } from 'path';
import { isFile, showFolder, showInFolder } from '../util';
import * as console from '@atxm/developer-console';

async function browseService(payload: BrowseServicePayload): Promise<void> {
  if (typeof payload === 'string') {
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
      console.warn(`[browse] Skipping: target path is of type ${typeof targetPath}, should be string`);
    }

    if (payload.action === 'reveal') {
      showInFolder(targetPath)
    } else if (payload.action === 'open') {
      showFolder(basename(targetPath), targetPath);
    } else if (payload.action?.length) {
      console.warn(`[browse] Action '${payload.action}' is not supported`);
    }
  });
}

export default browseService;
