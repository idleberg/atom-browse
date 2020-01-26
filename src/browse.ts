import { CompositeDisposable } from 'atom';

import apmFolder from './commands/apm';
import appFolder from './commands/application';
import appDataFolder from './commands/app-data';
import projectDependencies from './commands/dependencies';
import packagesFolder from './commands/packages';
import projectFolders from './commands/project';
import configFolder from './commands/config';
import resourcesFolder from './commands/resources';
import {
  revealFile,
  revealFiles
} from './commands/reveal';

export { config } from './config';

let subscriptions: CompositeDisposable | undefined;

export async function activate() {
  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
  subscriptions = new CompositeDisposable();

  // Register commands
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:.apm-folder': () => {
        apmFolder();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:application-folder': () => {
        appFolder();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:configuration-folder': () => {
        configFolder();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:app-data-folder': () => {
        appDataFolder();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:packages-folder': () => {
        packagesFolder();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:project-folders': () => {
        projectFolders();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:project-dependencies': () => {
        projectDependencies();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:resources-folder': () => {
        resourcesFolder();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:reveal-open-files': () => {
        revealFiles();
      }
    })
  );

  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'browse:reveal-file': () => {
        revealFile();
      }
    })
  );
}

export function deactivate() {
  subscriptions && subscriptions.dispose();
}
