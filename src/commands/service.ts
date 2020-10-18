import { basename } from 'path';
import { showFolder, showInFolder } from '../util';
import * as console from '@atxm/developer-console';

async function browseService(payload: BrowseServicePayload): Promise<void> {
  // if (!['open', 'reveal'].includes(payload.action)) {
  //   return console.warn(`Action '${payload.action}' is not supported`);
  // }

  const targetPaths = Array.isArray(payload.target)
    ? payload.target
    : [payload.target];

  targetPaths.map(targetPath => {
    if (typeof targetPath !== 'string') {
      console.warn(`Skipping: '${targetPath}' is not a string`);
    }

    payload.action === 'reveal'
      ? showInFolder(targetPath)
      : showFolder(basename(targetPath), targetPath);
  });
}

export default browseService;
