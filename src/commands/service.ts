import { basename } from 'path';
import { isDirectory, isFile, showFolder, showInFolder } from '../util';
import * as console from '@atxm/developer-console';

async function browseService(payload: BrowseServicePayload): Promise<void> {
  const targetPaths = Array.isArray(payload.target)
    ? payload.target
    : [payload.target];

  targetPaths.map(targetPath => {
    if (typeof targetPath !== 'string') {
      console.warn(`Skipping: '${targetPath}' is not a string`);
    }

    if (payload.action === 'reveal' || isFile(targetPath)) {
      showInFolder(targetPath)
    } else if (payload.action === 'open' || isDirectory(targetPath)) {
      showFolder(basename(targetPath), targetPath);
    } else if (payload.action?.length) {
      console.warn(`Action '${payload.action}' is not supported`);
    }
  });
}

export default browseService;
