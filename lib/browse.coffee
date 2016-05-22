{CompositeDisposable} = require 'atom'

# Dependencies
{exec} = require('child_process')
fs = require 'fs'
shell = require 'shell'

module.exports = BrowsePackages =
  self: 'browse'
  verbose: null
  subscriptions: null

  activate: ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:configuration-folder': => @browseConfig()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:packages-folder': => @browsePackages()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:project-folders': => @browseProjects()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:reveal-file': => @revealFile()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:reveal-all-open-files': => @revealFiles()

  deactivate: ->
    @subscriptions.dispose()

  browsePackages: ->
    @verbose = atom.config.get('browse.notify')
    packageDir = atom.packages.getPackageDirPaths()[0]

    # Does packages folder exist?
    try
      fs.accessSync(packageDir, fs.F_OK)
    catch error
      atom.notifications.addError(@self, detail: error, dismissable: true)
      return

    # Open packages folder
    @openFolder(packageDir)

  revealFile: ->
    # Get parent folder of active file
    editor = atom.workspace.getActivePaneItem()
    file = editor?.buffer.file

    if file isnt null
      @selectFile(file.path)
      return

    atom.notifications.addWarning("**#{@self}**: No active file", dismissable: false)

  revealFiles: ->
    # Get all open file
    items = atom.workspace.getPaneItems()

    unless items.length > 0
      atom.notifications.addWarning("**#{@self}**: No files open", dismissable: false)
      return

    for item in items
      if item.constructor.name is 'SettingsView'
        continue

      if item?.buffer.file
        file = item?.buffer.file
        @selectFile(file.path)

  browseProjects: ->
    projects = atom.project.getPaths()

    for project in projects
      # Skip Atom dialogs
      if project.startsWith('atom://')
        continue

      # Does project folder exist?
      try
        fs.accessSync(project, fs.F_OK)
      catch
        atom.notifications.addError(@self, detail: error, dismissable: true)
        continue

      # Open project folder
      @openFolder(project)

  browseConfig: ->
    path = require 'path'

    configFile = atom.config.getUserConfigPath()
    configPath = path.dirname(configFile)

    if @fileManager isnt null
      # Does config folder exist?
      try
        fs.accessSync(configPath, fs.F_OK)
      catch error
        atom.notifications.addError(@self, detail: error, dismissable: true)
        return

      # Open config folder
      @openFolder(configPath)

  selectFile: (path) ->
    # Custom file manager
    fileManager = atom.config.get('browse.fileManager')

    if fileManager?
      exec "\"#{fileManager}\" \"#{path}\""
      return

    # Default file manager
    switch process.platform
      when "darwin"
         exec "open -R #{path}"
      when "win32"
        exec "explorer /select,#{path}"
      when "linux"
        shell.showItemInFolder(path)

    @isVerbose(path, "Revealed")

  openFolder: (path) ->
    # Custom file manager
    fileManager = atom.config.get('browse.fileManager')

    if fileManager?
      exec "\"#{fileManager}\" \"#{path}\""
      return

    # Default file manager
    switch process.platform
      when "darwin"
        exec "open #{path}"
      when "win32"
        exec "explorer #{path}"
      when "linux"
        shell.openItem(path)

    @isVerbose(path, "Opened")

  isVerbose: (fullPath, verb) ->
    if atom.config.get('browse.notify') is true
      # Get base name
      path = require 'path'
      baseName = path.basename(fullPath)

      # Default file manager
      switch process.platform
        when "darwin"
          fileManager = "Finder"
        when "win32"
          fileManager = "Explorer"
        when "linux"
          fileManager = "file manager"

      atom.notifications.addInfo("**#{@self}**: #{verb} `#{baseName}` in #{fileManager}", dismissable: false)
