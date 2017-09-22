{ name } = require "../package.json"

module.exports = BrowsePackages =
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
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:configuration-folder": => @browseConfig()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:packages-folder": => @browsePackages()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:project-folders": => @browseProjects()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:reveal-file": => @revealFile()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:reveal-all-open-files": => @revealFiles()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:reveal-file-from-treeview": => @revealFileFromTreeview()
    @subscriptions.add atom.commands.add "atom-workspace", "#{name}:application-folder": => @appFolder()

  deactivate: ->
    @subscriptions?.dispose()
    @subscriptions = null

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

    @openFolder(appFolder)

  browsePackages: ->
    require("./ga").sendEvent name, "packages-folder"

    { accessSync, F_OK } = require "fs"

    packageDirs = atom.packages.getPackageDirPaths()

    for packageDir in packageDirs
      # Does packages folder exist?
      try
        accessSync(packageDir, F_OK)
      catch error
        atom.notifications.addError(name, detail: error, dismissable: true)

      # Open packages folder
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
    require("./ga").sendEvent name, "reveal-file-from-treeview"

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

    { accessSync, F_OK } = require "fs"

    projects = atom.project.getPaths()
    return atom.notifications.addWarning("**#{name}**: No active project", dismissable: false) unless projects.length > 0

    for project in projects
      # Skip Atom dialogs
      if project.startsWith('atom://')
        continue

      # Does project folder exist?
      try
        accessSync(project, F_OK)
      catch
        atom.notifications.addError(name, detail: error, dismissable: true)
        continue

      # Open project folder
      @openFolder(project)

  browseConfig: ->
    require("./ga").sendEvent name, "configuration-folder"

    { accessSync, F_OK } = require "fs"
    { dirname } = require "path"

    configFile = atom.config.getUserConfigPath()
    configPath = dirname(configFile)

    if configPath
      # Does config folder exist?
      try
        accessSync(configPath, F_OK)
      catch error
        atom.notifications.addError(name, detail: error, dismissable: true)
        return

      # Open config folder
      @openFolder(configPath)

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
        { showItemInFolder } = require "shell"
        showItemInFolder(path)
        atom.notifications.addInfo("**#{name}**: Opened `#{basename(path)}` in file manager", dismissable: false)

  openFolder: (path) ->
    { basename } = require "path"

    # Custom file manager
    fileManager = atom.config.get("#{name}.fileManager")
    return @spawnCmd fileManager, [ path ], basename(path), "file manager" if fileManager

    # Default file manager
    switch process.platform
      when "darwin"
        @spawnCmd "open", [ path ], basename(path), "Finder"
      when "win32"
        @spawnCmd "explorer", [ path ], basename(path), "Explorer"
      when "linux"
        { openItem } = require "shell"
        openItem(path)
        atom.notifications.addInfo("**#{name}**: Opened `#{basename(path)}` in file manager", dismissable: false)

  spawnCmd: (cmd, args, baseName, fileManager) ->
    { spawn } = require("child_process")

    open = spawn cmd, args

    open.stderr.on "data", (error) ->
      atom.notifications.addError("**#{name}**: #{error}", dismissable: true)

    open.on "close", ( errorCode ) ->
      if errorCode is 0 and atom.config.get("#{name}.notify")
        atom.notifications.addInfo("**#{name}**: Opened `#{baseName}` in #{fileManager}", dismissable: false)
