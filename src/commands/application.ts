async function appFolder(): Promise<void> {
  const { dirname, resolve } = await import('path');
  const { getConfig, showFolder } = await import('../util');
  const { platform } = await import('os');
  const findUp = await import('find-up');

  const execPath = dirname(resolve(process.execPath));
  let appFolder;


  if (platform() === 'darwin' && getConfig('openAppPackage')) {
    const resFolder = findUp.sync('Resources', {cwd: execPath, type: 'directory'});

    appFolder = resFolder
      ? dirname(resFolder)
      : execPath;
  } else {
    appFolder = execPath;
  }

  showFolder({
    name: 'Application Folder',
    path: appFolder
  });
}

export {
  appFolder
};
