import { PLATFORM } from './util';

function openAppPackage(): Record<string, unknown> {
	if (PLATFORM) {
		return {
			title: 'Open App Package',
			description: `Specify whether *Browse: Application Folder* opens the \`${atom.getAppName()}.app\` package or the executable that started the Node.js process (i.e. \`Atom Helper\`)`,
			type: 'boolean',
			default: true,
			order: 3,
		};
	}

	return {};
}

export default {
	notify: {
		title: 'Notifications',
		description: 'Specify which types of notifications to display',
		type: 'string',
		enum: [
			{
				value: 'none',
				description: 'None',
			},
			{
				value: 'warnings',
				description: 'Warnings Only',
			},
			{
				value: 'all',
				description: 'All Notifications',
			},
		],
		default: 'all',
		order: 1,
	},
	dependencyPaths: {
		title: 'Dependency Paths',
		description: 'Specify dependency folders that can be opened using the *Browse: Dependency Folders* command',
		type: 'array',
		default: ['bower_components', 'node_modules', 'vendor'],
		items: {
			type: ['string'],
		},
		order: 2,
	},
	beep: {
		title: 'Beep on error',
		description: 'Play beep sound when errors occur',
		type: 'boolean',
		default: true,
		order: 3,
	},
	openAppPackage: openAppPackage(),
	customFileManager: {
		title: 'Custom File Manager Options',
		type: 'object',
		order: 5,
		properties: {
			fullPath: {
				title: 'Full Path',
				description: 'Specify the full path to a custom file manager',
				type: 'string',
				default: '',
				order: 1,
			},
			openArgs: {
				title: 'Open Arguments',
				description: 'Specify custom arguments to open a folder. The use of the `%path%` placeholder is optional.',
				type: 'array',
				default: [],
				items: {
					type: ['string', 'integer'],
				},
				order: 2,
			},
			revealArgs: {
				title: 'Reveal Arguments',
				description: 'Specify custom arguments to reveal a file. The use of the `%path%` placeholder is optional.',
				type: 'array',
				default: [],
				items: {
					type: ['string', 'integer'],
				},
				order: 3,
			},
		},
	},
};
