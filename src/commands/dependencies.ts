import { stat } from 'fs';
import { resolve } from 'path';
import { getConfig, showFolder, warn } from '../util';

const projectDependencies = async (): Promise<void> => {
  const projectPaths: string[] = atom.project.getPaths();

  if (projectPaths.length === 0) {
    return warn('Editor has no projects');
  }

  const dependencyPaths = getConfig('dependencyPaths');

  if (!dependencyPaths || !dependencyPaths.length) {
    return warn('No dependency folders specified in package configuration');
  }

  projectPaths.forEach( projectPath => {
    if (!projectPath.startsWith('atom://')) {
      dependencyPaths.forEach( dependencyPath => {
        const resolvedDependencyPath = resolve(projectPath, dependencyPath);

        stat(resolvedDependencyPath, (error, stats) => {
          if (error) {
            if (atom.inDevMode()) console.error(error);

            return;
          } else if (stats.isDirectory()) {
            showFolder(`\`${dependencyPath}\``, resolvedDependencyPath);
          }
        });
      });

    }
  });
};

export default projectDependencies;


