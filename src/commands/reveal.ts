import { showInFolder, warn } from '../util';

const revealFile = async (pane?): Promise<void> => {
  const activePane = (pane) ? pane : atom.workspace.getActivePaneItem();

  if (activePane && (activePane.constructor.name === 'TextEditor' || activePane.constructor.name === 'ImageEditor')) {
    const filePath: string = (activePane.buffer.file) ? activePane.buffer.file.path : '';

    if (filePath) {
      showInFolder(filePath);
    } else {
      warn('File hasn\'t been saved yet');
    }
  } else {
    warn('Active pane is not an editor');
  }
};

const revealFiles = (): void => {
  const paneItems = atom.workspace.getPaneItems();

  if (paneItems.length) {
    paneItems.forEach( paneItem => {
      revealFile(paneItem);
    });
  } else {
    warn('No active files');
  }

};

export {
  revealFile,
  revealFiles
};
