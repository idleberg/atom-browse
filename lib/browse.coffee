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
      catch e
        console.log e
        return

      # Open packages folder
      exec "#{@fileManager} #{packageDir}"

  getFileManager: ->

    switch process.platform
      when "darwin"
        return "open"
      when "win32"
        return "explorer"
      when "linux"
        console.log "browse: Linux is not yet supported."
        return null
