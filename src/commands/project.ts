import { showFolder, warn } from '../util';

async function projectFolders(): Promise<void> {
  const projectPaths: string[] = atom.project.getPaths();

  if (projectPaths.length === 0) {
    return warn('Editor has no projects');
  }

  projectPaths.map( projectPath => {
    if (!projectPath.startsWith('atom://')) {
      showFolder({
        name: 'Project Folder',
        path: projectPath
      });
    }
  });
}

export default projectFolders;
