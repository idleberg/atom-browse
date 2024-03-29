# browse

[![apm](https://flat.badgen.net/apm/license/browse)](https://atom.io/packages/browse)
[![apm](https://flat.badgen.net/apm/v/browse)](https://atom.io/packages/browse)
[![apm](https://flat.badgen.net/apm/dl/browse)](https://atom.io/packages/browse)
[![CI](https://img.shields.io/github/workflow/status/idleberg/atom-browse/CI?style=flat-square)](https://github.com/idleberg/atom-browse/actions)

## Description

Adds commands that let you quickly browse Atom-related folders or reveal files you're working on ([details below](#usage))

![Screenshot](https://raw.githubusercontent.com/idleberg/atom-browse/master/screenshot.gif)

## Installation

### apm

Install `browse` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install browse`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone the repository as `browse`:

```bash
$ git clone https://github.com/idleberg/atom-browse browse
```

Install dependencies:

```bash
$ cd browse && npm install
```

## Usage

Once installed, you can run any of the following commands from the [Command Palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette).

**Project-specific:**

- `Browse: Project Folder(s)`
- `Browse: Project Dependencies` (e.g. `node_modules`, `vendor`)
- `Browse: Reveal File`
- `Browse: Reveal Open Files`

**Atom-specific:**

- `Browse: .apm Folder`
- `Browse: Application Folder`
- `Browse: App Data Folder`
- `Browse: Configuration Folder`
- `Browse: Packages Folder`
- `Browse: Resources Folder`

## Settings

If you want to override your system's default file-manager, you can specify its path in the [package settings](https://flight-manual.atom.io/using-atom/sections/atom-packages/#package-settings).

<details>
<summary><strong>Example</strong></summary>

```cson
browse:
  customFileManager:
    fullPath: "%PROGRAMFILES%\\Explorer++\\Explorer++.exe"
```

</details>

Furthermore, you can specify custom arguments for the open and reveal actions.

<details>
<summary><strong>Example</strong></summary>

```cson
browse:
  customFileManager:
    openArgs: ["-o", "%path%"]
    revealArgs: ["-r", "%path%"]
```

**Note:** The `%path%` placeholder can be omitted when it's the last argument

</details>

## Service Provider

### API

At its most basic, the method provided by the service accepts a single argument, the path to a file or folder:

```js
browse(pathToFile);
```

However, you can also pass an object that offers additional options:

```ts
browse({
  message?: "Revealing output file..."
  silent?: false,
  target: pathToFile
})
```

See below for a real-world example.

### Usage

To consume the provided service, add the following to your `package.json`:

```json
{
  "consumedServices": {
    "browse": {
      "versions": {
        "1.0.0": "consumeBrowse"
      }
    }
  }
}
```

Next up, you need to consume the service in your package's main file.

<details>
<summary><strong>Example</strong></summary>

```js
import { CompositeDisposable, Disposable } from "atom";

export default {
  // Assign service provider
  consumeBrowse(browse) {
    this.browse = browse;

    return new Disposable(() => {
      this.browse = null;
    });
  },

  // Example function that consumes the service
  async revealFile(pathToFile) {
    await this.browse(pathToFile);
  },

  // Optional: Assign command for your reveal function
  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "my-package:reveal-file": async () =>
          await this.revealFile("/path/to/file"),
      })
    );
  },
};
```

</details>

### Options

#### `target`

Type: `string | string[]`

Specifies the target path(s) that should be opened.

#### `message`

Type: `string`

Custom message to be displayed for the action

#### `silent`

Type: `boolean`

Disables notification for action

## License

This work is licensed under the [MIT License](LICENSE)
