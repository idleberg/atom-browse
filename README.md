# browse

[![apm](https://img.shields.io/apm/l/browse.svg?style=flat-square)](https://atom.io/packages/browse)
[![apm](https://img.shields.io/apm/v/browse.svg?style=flat-square)](https://atom.io/packages/browse)
[![apm](https://img.shields.io/apm/dm/browse.svg?style=flat-square)](https://atom.io/packages/browse)
[![Travis](https://img.shields.io/travis/idleberg/atom-browse.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-browse)
[![David](https://img.shields.io/david/dev/idleberg/atom-browse.svg?style=flat-square)](https://david-dm.org/idleberg/atom-browse?type=dev)

Adds commands that let you quickly browse Atom-related folders or reveal files you're working on ([details below](#usage))

![Screenshot](https://raw.githubusercontent.com/idleberg/atom-browse/master/screenshot.gif)

## Installation

### apm

Install `browse` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install browse`

### Using Git

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone the repository as `browse`:

```bash
$ git clone https://github.com/idleberg/atom-browse browse
```

## Usage

Run any of the following commands from the [Command Palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette):

* `Browse: Packages Folder`
* `Browse: Configuration Folder`
* `Browse: Reveal file`
* `Browse: Reveal All Open Files`
* `Browse: Project Folder(s)`
* `Browse: App Folder`

All of these commands can also be accessed from the *“Packages”* menu and the context menu. Lastly, the [package-developer-toolbar](https://github.com/idleberg/atom-package-developer-toolbar) provides a graphical user interface for most of these commands.

## Options

If you want to override your system's default file-manager, you can specify its path in your Atom [configuration](http://flight-manual.atom.io/using-atom/sections/basic-customization/#_global_configuration_settings).

**Example:**

```cson
"browse":
  fileManager: "%PROGRAMFILES%\\Explorer++\\Explorer++.exe"
```

Also in `config.cson`, you can activate Atom info notifications for visual feedback on your actions.

**Example:**

```cson
"browse":
  notify: true
```

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-browse) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
