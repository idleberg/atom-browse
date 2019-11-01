# browse

[![apm](https://flat.badgen.net/apm/license/browse)](https://atom.io/packages/browse)
[![apm](https://flat.badgen.net/apm/v/browse)](https://atom.io/packages/browse)
[![apm](https://flat.badgen.net/apm/dl/browse)](https://atom.io/packages/browse)
[![CircleCI](https://flat.badgen.net/circleci/github/idleberg/atom-browse)](https://circleci.com/gh/idleberg/atom-browse)

# Description

Adds commands that let you quickly browse Atom-related folders or reveal files you're working on ([details below](#usage))

![Screenshot](https://raw.githubusercontent.com/idleberg/atom-browse/master/screenshot.gif)

## Installation

### apm

Install `browse` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install browse`

### Using Git

Change to your Atom packages directory:

**Windows**

```cmd
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
* `Browse: Reveal File`
* `Browse: Reveal Open Files`

**Atom-specific:**

* `Browse: .apm Folder`
* `Browse: Application Folder`
* `Browse: Configuration Folder`
* `Browse: Packages Folder`

## Options

If you want to override your system's default file-manager, you can specify its path in your Atom [configuration](http://flight-manual.atom.io/using-atom/sections/basic-customization/#_global_configuration_settings).

**Example:**

```cson
browse:
  customFileManager:
    fullPath: "%PROGRAMFILES%\\Explorer++\\Explorer++.exe"
```

Furthermore, you can specify custom arguments for the open and reveal actions.

**Example:**

```cson
browse:
  customFileManager:
    openArgs: ["-o", "%path%"]
    revealArgs: ["-r", "%path%"]
```

**Note:** The `%path%` placeholder can be omitted when it's the last argument

## License

This work is licensed under the [MIT License](LICENSE)
