exec = require('child_process').exec
fs   = require 'fs'
path = require 'path'

{CompositeDisposable} = require 'atom'

module.exports = BrowsePackages =
  browsePackagesView: null
  subscriptions: null
  fileManager: null
  configFile: atom.config.getUserConfigPath()
  packageDir: atom.packages.getPackageDirPaths()[0]

  activate: ->

    # Find default file manager
    @fileManager = @getFileManager()

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:configuration-folder': => @browseConfig()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:packages-folder': => @browsePackages()

  deactivate: ->
    @subscriptions.dispose()

  browsePackages: ->
    if @fileManager isnt null

      # Does packages folder exist?
      try
        fs.accessSync(@packageDir, fs.F_OK)
      catch error
        atom.notifications.addError("atom-browse", detail: error, dismissable: true)
        return

      # Open packages folder
      exec "#{@fileManager} #{@packageDir}"

  browseConfig: ->
    configPath = path.dirname(@configFile)

    if @fileManager isnt null

      # Does config folder exist?
      try
        fs.accessSync(configPath, fs.F_OK)
      catch error
        atom.notifications.addError("atom-browse", detail: error, dismissable: true)
        return

      # Open packages folder
      exec "#{@fileManager} #{configPath}"



  getFileManager: ->
    switch process.platform
      when "darwin"
        return "open"
      when "win32"
        return "explorer"
      when "linux"
        atom.notifications.addWarning("atom-browse", detail: "Hold tight, Linux user. Support for your operating system is underway!", dismissable: true)
        return null
