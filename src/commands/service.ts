import { basename } from 'path';
import { isDirectory, isFile, showFolder, showInFolder } from '../util';

async function browseService(payload: BrowseServicePayload): Promise<void> {
  const targetPaths = Array.isArray(payload.target)
    ? payload.target
    : [payload.target];

  targetPaths.map(targetPath => {
    if (typeof targetPath !== 'string') {
      if (atom.inDevMode()) console.warn(`[browse] Skipping: '${targetPath}' is not a string`);
    }

    if (payload.action === 'reveal' || isFile(targetPath)) {
      showInFolder(targetPath)
    } else if (payload.action === 'open' || isDirectory(targetPath)) {
      showFolder(basename(targetPath), targetPath);
    } else if (payload.action?.length) {
      if (atom.inDevMode()) console.warn(`[browse] Action '${payload.action}' is not supported`);
    }
  });
}

export default browseService;
