import { browseService } from './commands/service';
import { CompositeDisposable } from 'atom';
import console from './log';
import configSchema from './config';

export default {
	config: configSchema,
	subscriptions: new CompositeDisposable(),

	async activate(): Promise<void> {
		console.log('Activating package');

		// Register commands
		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:.apm-folder': async () => {
					const { apmFolder } = await import('./commands/apm');
					await apmFolder();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:app-data-folder': async () => {
					const { appDataFolder } = await import('./commands/app-data');
					await appDataFolder();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:application-folder': async () => {
					const { appFolder } = await import('./commands/application');
					await appFolder();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:configuration-folder': async () => {
					const { configFolder } = await import('./commands/configuration');
					await configFolder();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:packages-folder': async () => {
					const { packagesFolder } = await import('./commands/packages');
					await packagesFolder();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:project-folders': async () => {
					const { projectFolders } = await import('./commands/project');
					projectFolders();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:project-dependencies': async () => {
					const { projectDependencies } = await import('./commands/dependencies');
					projectDependencies();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:resources-folder': async () => {
					const { resourcesFolder } = await import('./commands/resources');
					resourcesFolder();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:reveal-open-files': async () => {
					const { revealFiles } = await import('./commands/reveal');
					revealFiles();
				},
			}),
		);

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'browse:reveal-file': async () => {
					const { revealFile } = await import('./commands/reveal');
					revealFile();
				},
			}),
		);
	},

	deactivate(): void {
		console.log('Deactivating package');

		this.subscriptions?.dispose();
	},

	provideBrowse(): unknown {
		console.log('Providing service');

		return browseService;
	},
};
