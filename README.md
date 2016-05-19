[![apm](https://img.shields.io/apm/l/browse.svg?style=flat-square)](https://atom.io/packages/browse)
[![apm](https://img.shields.io/apm/v/browse.svg?style=flat-square)](https://atom.io/packages/browse)
[![apm](https://img.shields.io/apm/dm/browse.svg?style=flat-square)](https://atom.io/packages/browse)
[![Travis](https://img.shields.io/travis/idleberg/atom-browse.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-browse)
[![David](https://img.shields.io/david/dev/idleberg/atom-browse.svg?style=flat-square)](https://david-dm.org/idleberg/atom-browse#info=dependencies)

# atom-browse

Adds commands that let you quickly browse Atom-related folders or reveal files you're working on ([details below](#usage))

![Screenshot](https://raw.githubusercontent.com/idleberg/atom-language-nsis/master/screenshot.gif)

## Installation

### apm

Install `browse` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install browse`

### GitHub

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Mac OS X & Linux
$ cd ~/.atom/packages/
```

Clone the repository `browse`:

`$ git clone https://github.com/idleberg/atom-browse browse`

## Setup

This package will try and detect your default file manager, and will use Finder on Mac OS X and Explorer on Windows. On Linux, this package iterates over available options.

If you want to override the system default file manager, you can do so in your `config.cson`.

**Example:**

```cson
"browse":
  fileManager: "%PROGRAMFILES%\\Explorer++\\Explorer++.exe"
```

## Usage

Run any of the following commands from the [Command Palette](https://atom.io/docs/latest/getting-started-atom-basics#command-palette):

* `Browse: Packages folder`
* `Browse: Configuration folder`
* `Browse: Reveal file`
* `Browse: Project folder(s)`

All of these commands can also be accessed from the *“Packages”* menu. From the context menu, you can run `Reveal file`.

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-browse) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
