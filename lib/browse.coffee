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
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:enclosing-folder': => @browseEnclosing()

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

  browseEnclosing: ->
    # Get parent folder of active file
    editor = atom.workspace.getActivePaneItem()
    file = editor?.buffer.file
    filePath = path.dirname(file?.path)

    # Open packages folder
    exec "#{@fileManager} #{filePath}"

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
        # There are many possibile file managers on Linux, let's iterate over
        # the most popular ones
        # TODO: write preference to config.json
        result = null
        linuxFileManagers = ['xdg-open', 'gnome-open', 'kde-open', 'nautilus']

        for fm in linuxFileManagers
          try
            exec "which #{fm}", (error, stdout, stderr) ->
                if error is null and stdout isnt null
                  result = fm

          # Did we find anything yet?
          if fm isnt null
            return fm

        atom.notifications.addWarning("atom-browse", detail: "No supported file manager detected", dismissable: true)
        return null
