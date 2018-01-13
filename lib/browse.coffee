{ name } = require "../package.json"

module.exports = Browse =
  config:
    fileManager:
      title: "File manager"
      description: "Specify the full path to a custom file manager"
      type: "string"
      default: ""
    notify:
      title: "Verbose Mode"
      description: "Show info notifications for all actions"
      type: "boolean"
      default: false
  subscriptions: null

  activate: ->
    # Events subscribed to in Atom's system can be easily cleaned up with a CompositeDisposable
    { CompositeDisposable } = require "atom"
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:.apm-folder": => @apmFolder()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:application-folder": => @appFolder()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:configuration-folder": => @browseConfig()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:packages-folder": => @browsePackages()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:project-folders": => @browseProjects()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:reveal-all-open-files": => @revealFiles()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:reveal-file": => @revealFile()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:reveal-file-from-tree-view": => @revealFileFromTreeview()

  deactivate: ->
    @subscriptions?.dispose()
    @subscriptions = null

  apmFolder: ->
    require("./ga").sendEvent name, "apm-folder"

    { dirname, join } = require "path"

    configFile = atom.config.getUserConfigPath()
    configPath = dirname(configFile)
    apmPath = join(configPath, '.apm')

    @openFolder(apmPath) if apmPath

  appFolder: ->
    require("./ga").sendEvent name, "application-folder"

    { platform } = require "os"
    { dirname, join, resolve } = require "path"

    processBin = resolve process.execPath
    processPath = dirname processBin

    switch platform()
      when "darwin"
        appFolder = join(processPath, "..", "..", "..", "..")
      else
        appFolder = processPath

    @openFolder(appFolder) if appFolder

  browsePackages: ->
    require("./ga").sendEvent name, "packages-folder"


    packageDirs = atom.packages.getPackageDirPaths()

    for packageDir in packageDirs
      @openFolder(packageDir)

  revealFile: ->
    require("./ga").sendEvent name, "reveal-file"

    editor = atom.workspace.getActivePaneItem()

    if editor?.constructor.name is "TextEditor" or editor?.constructor.name is "ImageEditor"
      file = if editor?.buffer?.file then editor.buffer.file else if editor?.file then editor.file

      if file?.path
        @selectFile(file.path)
        return

    atom.notifications.addWarning("**#{name}**: No active file", dismissable: false)

  revealFiles: ->
    require("./ga").sendEvent name, "reveal-all-open-files"

    editors = atom.workspace.getPaneItems()

    if editors.length > 0
      count = 0
      for editor in editors
        continue unless editor.constructor.name is "TextEditor" or editor.constructor.name is "ImageEditor"

        file = if editor?.buffer?.file then editor.buffer.file else if editor?.file then editor.file

        if file?.path
          @selectFile(file.path)
          count++

      return if count > 0

    atom.notifications.addWarning("**#{name}**: No open files", dismissable: false)

  revealFileFromTreeview: ->
    require("./ga").sendEvent name, "reveal-file-from-tree-view"

    panes = atom.workspace.getPaneItems()

    if panes.length > 0
      count = 0
      for pane in panes
        continue unless pane.constructor.name is "TreeView"

        file = pane.selectedPath

        if file?
          @selectFile(file)
          return

      return if count > 0

    atom.notifications.addWarning("**#{name}**: No selected files", dismissable: false)

  browseProjects: ->
    require("./ga").sendEvent name, "project-folders"


    projectPaths = atom.project.getPaths()
    return atom.notifications.addWarning("**#{name}**: No active project", dismissable: false) unless projectPaths.length > 0

    for projectPath in projectPaths
      # Skip Atom dialogs
      continue if projectPath.startsWith('atom://')

      @openFolder(projectPath)

  browseConfig: ->
    require("./ga").sendEvent name, "configuration-folder"

    { dirname } = require "path"

    configFile = atom.config.getUserConfigPath()
    configPath = dirname(configFile)

    @openFolder(configPath) if configPath

  selectFile: (path) ->
    require("./ga").sendEvent name, "configuration-folder"

    { basename } = require "path"

    # Custom file manager
    fileManager = atom.config.get("#{name}.fileManager")
    return @spawnCmd fileManager, [ path ], basename(path), "file manager" if fileManager

    # Default file manager
    switch process.platform
      when "darwin"
        @spawnCmd "open", [ "-R", path ], basename(path), "Finder"
      when "win32"
        @spawnCmd "explorer", [ "/select,#{path}" ], basename(path), "Explorer"
      when "linux"
        { shell } = require "electron"
        shell.showItemInFolder(path)
        atom.notifications.addInfo("**#{name}**: Opening `#{basename(path)}` in file manager", dismissable: false) if atom.config.get("#{name}.notify")

  openFolder: (path) ->
    { access, F_OK } = require "fs"
    { basename } = require "path"

    access path, F_OK, (error) ->
      return atom.notifications.addError(name, detail: error, dismissable: true) if error

      # Custom file manager
      fileManager = atom.config.get("#{name}.fileManager")
      return Browse.spawnCmd fileManager, [ path ], basename(path), "file manager" if fileManager

      # Default file manager
      switch process.platform
        when "darwin"
          Browse.spawnCmd "open", [ path ], basename(path), "Finder"
        when "win32"
          Browse.spawnCmd "explorer", [ path ], basename(path), "Explorer"
        when "linux"
          { shell } = require "electron"
          shell.openItem(path)
          atom.notifications.addInfo("**#{name}**: Opening `#{basename(path)}` in file manager", dismissable: false) if atom.config.get("#{name}.notify")

  spawnCmd: (cmd, args, baseName, fileManager) ->
    { spawn } = require("child_process")

    open = spawn cmd, args

    open.stderr.on "data", (error) ->
      atom.notifications.addError("**#{name}**: #{error}", dismissable: true)

    open.on "close", ( errorCode ) ->
      if errorCode is 0 and atom.config.get("#{name}.notify")
        atom.notifications.addInfo("**#{name}**: Opening `#{baseName}` in #{fileManager}", dismissable: false)
