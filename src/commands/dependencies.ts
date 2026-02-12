import { resolve } from 'node:path';

export async function projectDependencies(): Promise<void> {
	const { getConfig, showFolder, warn } = await import('../util');

	const projectPaths: string[] = atom.project.getPaths();

	if (projectPaths.length === 0) {
		return warn('Editor has no projects');
	}

	const dependencyPaths = getConfig('dependencyPaths') as string[];

	if (!dependencyPaths || !dependencyPaths.length) {
		return warn('No dependency folders specified in package configuration');
	}

	await Promise.all(
		projectPaths.map(async (projectPath) => {
			if (!projectPath.startsWith('atom://')) {
				await Promise.all(
					dependencyPaths.map(async (dependencyPath: string) => {
						const resolvedDependencyPath: string = resolve(projectPath, dependencyPath);

						showFolder({
							name: `\`${dependencyPath}\``,
							path: resolvedDependencyPath,
						});
					}),
				);
			}
		}),
	);
}
