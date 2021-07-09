
async function projectDependencies(): Promise<void> {
  const { getConfig, showFolder, warn } = await import('../util');
  const { resolve } = await import('path');

  const projectPaths: string[] = atom.project.getPaths();

  if (projectPaths.length === 0) {
    return warn('Editor has no projects');
  }

  const dependencyPaths = getConfig('dependencyPaths');

  if (!dependencyPaths || !dependencyPaths.length) {
    return warn('No dependency folders specified in package configuration');
  }

  projectPaths.map( projectPath => {
    if (!projectPath.startsWith('atom://')) {
      dependencyPaths.map( async (dependencyPath: string) => {
        const resolvedDependencyPath: string = resolve(projectPath, dependencyPath);

        showFolder({
          name: `\`${dependencyPath}\``,
          path: resolvedDependencyPath
        });
      });
    }
  });
}

export {
  projectDependencies
};
