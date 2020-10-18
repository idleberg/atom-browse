import { showInFolder, warn } from '../util';

// eslint-disable-next-line
async function revealFile(pane?): Promise<void> {
  const activePane = pane
    ? pane
    : atom.workspace.getActiveTextEditor() || atom.workspace.getActivePaneItem();

  if (activePane && (activePane.constructor.name === 'TextEditor' || activePane.constructor.name === 'ImageEditor')) {
    const filePath: string = (activePane.buffer.file)
      ? activePane.buffer.file.path
      : '';

    if (filePath) {
      showInFolder(filePath);
    } else {
      warn('File hasn\'t been saved yet');
    }
  } else {
    warn('Active pane is not an editor');
  }
}

async function revealFiles(): Promise<void> {
  const paneItems = atom.workspace.getPaneItems();

  if (paneItems.length) {
    paneItems.map( paneItem => {
      revealFile(paneItem);
    });
  } else {
    warn('No active files');
  }

}

export {
  revealFile,
  revealFiles
};
