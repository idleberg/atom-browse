exec = require('child_process').exec
fs   = require 'fs'
path = require 'path'

{CompositeDisposable} = require 'atom'

module.exports = BrowsePackages =
  browsePackagesView: null
  subscriptions: null
  fileManager: null
  packageDir: atom.packages.getPackageDirPaths()[0]

  activate: (state) ->

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:packages-folder': => @browsePackages()

  deactivate: ->
    @subscriptions.dispose()

  browsePackages: ->

    # Find default file manager
    @fileManager = @getFileManager()

    if @fileManager isnt null

      # Does packages folder exist?
      try
        fs.accessSync(@packageDir, fs.F_OK)
      catch error
        atom.notifications.addError("atom-browse", detail: error, dismissable: true)
        return

      # Open packages folder
      exec "#{@fileManager} #{@packageDir}"

  getFileManager: ->

    switch process.platform
      when "darwin"
        return "open"
      when "win32"
        return "explorer"
      when "linux"
        atom.notifications.addWarning("atom-browse", detail: "Hold tight. Linux is not yet supported, but we're working on it!", dismissable: true)
        return null
