async function appDataFolder(): Promise<void> {
  const { homedir, platform } = await import('os');
  const { resolve } = await import('path');
  const { showFolder } = await import('../util');

  let appDataFolder: string;

  switch (platform()) {
    case 'darwin':
      appDataFolder = resolve(homedir(), 'Library', 'Application Support', 'Atom');
      break;
    case 'win32':
      appDataFolder = (process.env.APPDATA)
        ? resolve(process.env.APPDATA, 'Atom')
        : '';
      break;
    default:
      appDataFolder = resolve(homedir(), '.config', 'Atom');
      break;
  }

  showFolder({
    name: 'App Data Folder',
    path: appDataFolder
  });
}

export {
  appDataFolder
};
