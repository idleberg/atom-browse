export async function revealFile(pane?): Promise<void> {
	const { showInFolder, warn } = await import('../util');

	const activePane = pane ? pane : atom.workspace.getActiveTextEditor() || atom.workspace.getActivePaneItem();

	if (activePane && (activePane.constructor.name === 'TextEditor' || activePane.constructor.name === 'ImageEditor')) {
		const filePath: string = activePane.buffer.file ? activePane.buffer.file.path : '';

		if (filePath) {
			showInFolder({ path: filePath });
		} else {
			warn("File hasn't been saved yet");
		}
	} else {
		warn('Active pane is not an editor');
	}
}

export async function revealFiles(): Promise<void> {
	const { warn } = await import('../util');

	const paneItems = atom.workspace.getPaneItems();

	if (paneItems.length) {
		await Promise.all(paneItems.map((paneItem) => revealFile(paneItem)));
	} else {
		warn('No active files');
	}
}
