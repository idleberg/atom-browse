import { showFolder, warn } from '../util';

const projectFolders = async (): Promise<void> => {
  const projectPaths: string[] = atom.project.getPaths();

  if (projectPaths.length === 0) {
    return warn('Editor has no projects');
  }

  projectPaths.map( projectPath => {
    if (!projectPath.startsWith('atom://')) {
      showFolder('Project Folder', projectPath);
    }
  });
};

export default projectFolders;
