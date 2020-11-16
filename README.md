# browse

[![apm](https://flat.badgen.net/apm/license/browse)](https://atom.io/packages/browse)
[![apm](https://flat.badgen.net/apm/v/browse)](https://atom.io/packages/browse)
[![apm](https://flat.badgen.net/apm/dl/browse)](https://atom.io/packages/browse)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-browse)](https://circleci.com/gh/idleberg/atom-browse)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-browse)](https://david-dm.org/idleberg/atom-browse)

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
# Windows Powershell
cd $Env:USERPROFILE\.atom\packages

# Windows Command Prompt
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
cd browse && npm install
```

## Usage

Once installed, you can run any of the following commands from the [Command Palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette).

**Project-specific:**

* `Browse: Project Folder(s)`
* `Browse: Project Dependencies` (e.g. `node_modules`, `vendor`)
* `Browse: Reveal File`
* `Browse: Reveal Open Files`

**Atom-specific:**

* `Browse: .apm Folder`
* `Browse: Application Folder`
* `Browse: App Data Folder`
* `Browse: Configuration Folder`
* `Browse: Packages Folder`
* `Browse: Resources Folder`

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

This package provides the service to open/reveal custom paths. To consume it, add the following to your `package.json`:

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
    await this.browse({
      action: 'reveal',
      target: pathToFile
    })
  },

  // Optional: Assign command for your reveal function
  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package:reveal-file': async () => await this.revealFile('/path/to/file')
    }));
  }
}
```
</details>

### Options

#### `action`

Type: `string`  
Arguments: `reveal | open`  

Specifies the default action for the service. You can open folders or reveal files in your file manager.

**Note:** As of version v3.1, this option can be omitted. The action will tgeb be determined by whether target option resolves to a file or directory.

#### `target`

Type: `string | string[]`

Specifies the target path(s) that should be opened.

## License

This work is licensed under the [MIT License](LICENSE)
