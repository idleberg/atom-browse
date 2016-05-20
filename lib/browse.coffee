# Dependencies
fs   = require 'fs'
path = require 'path'
shell = require 'shell'

{CompositeDisposable} = require 'atom'

module.exports = BrowsePackages =
  self: 'browse'
  subscriptions: null
 
  activate: ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:configuration-folder': => @browseConfig()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:packages-folder': => @browsePackages()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:project-folders': => @browseProjects()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:reveal-file': => @revealFile()

  deactivate: ->
    @subscriptions.dispose()

  browsePackages: ->
    packageDir: atom.packages.getPackageDirPaths()[0]

    # Does packages folder exist?
    try
      fs.accessSync(packageDir, fs.F_OK)
    catch error
      atom.notifications.addError(@self, detail: error, dismissable: true)
      return

    # Open packages folder
    shell.showItemInFolder(packageDir)

  revealFile: ->
    # Get parent folder of active file
    editor = atom.workspace.getActivePaneItem()
    file = editor?.buffer.file

    if file isnt null
      filePath = path.dirname(file?.path)

      # Reveal file
      shell.showItemInFolder(file.path)
      return

    atom.notifications.addWarning("**#{@self}**: No active file", dismissable: false)

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
      shell.showItemInFolder(project)

  browseConfig: ->
    configFile: atom.config.getUserConfigPath()
    configPath = path.dirname(configFile)

    # Does config folder exist?
    try
      fs.accessSync(configPath, fs.F_OK)
    catch error
      atom.notifications.addError(@self, detail: error, dismissable: true)
      return

    # Open config folder
    shell.openItem(configPath)
