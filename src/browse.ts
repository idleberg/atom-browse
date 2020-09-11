import { CompositeDisposable } from 'atom';
import * as console from '@atxm/developer-console';

import configSchema from './config';

import apmFolder from './commands/apm';
import appFolder from './commands/application';
import appDataFolder from './commands/app-data';
import browseService from './commands/service';
import projectDependencies from './commands/dependencies';
import packagesFolder from './commands/packages';
import projectFolders from './commands/project';
import configFolder from './commands/configuration';
import resourcesFolder from './commands/resources';
import {
  revealFile,
  revealFiles
} from './commands/reveal';

export default {
  config: configSchema,
  subscriptions: null,

  async activate(): Promise<void> {
    console.log('Activate');

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register commands
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:.apm-folder': () => apmFolder()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:application-folder': () => appFolder()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:configuration-folder': () => configFolder()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:app-data-folder': () => appDataFolder()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:packages-folder': () => packagesFolder()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:project-folders': () => projectFolders()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:project-dependencies': () => projectDependencies()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:resources-folder': () => resourcesFolder()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:reveal-open-files': () => revealFiles()
      })
    );

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'browse:reveal-file': () => revealFile()
      })
    );
  },

  deactivate(): void {
    console.log('Deactivate');

    this.subscriptions && this.subscriptions.dispose();
  },

  provideBrowse(): unknown {
    console.log('Provide');

    return browseService
  }
}
