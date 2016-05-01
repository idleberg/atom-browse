exec = require('child_process').exec
fs   = require 'fs'
path = require 'path'

{CompositeDisposable} = require 'atom'

module.exports = BrowsePackages =
  self: 'browse'
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
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:project-folders': => @browseProjects()
    @subscriptions.add atom.commands.add 'atom-workspace', 'browse:reveal-file': => @revealFile()

  deactivate: ->
    @subscriptions.dispose()

  browsePackages: ->
    if @fileManager isnt null

      # Does packages folder exist?
      try
        fs.accessSync(@packageDir, fs.F_OK)
      catch error
        atom.notifications.addError(@self, detail: error, dismissable: true)
        return

      # Open packages folder
      exec "#{@fileManager} #{@packageDir}"

  revealFile: ->
    # Get parent folder of active file
    editor = atom.workspace.getActivePaneItem()
    file = editor?.buffer.file

    if file isnt null
      filePath = path.dirname(file?.path)

      switch process.platform
        when "darwin"
          args = "-R #{file.path}"
        when "win32"
          args = "/select,#{file.path}"
        when "linux"
          args = filePath

      # Reveal file
      exec "#{@fileManager} #{args}"
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
      exec "#{@fileManager} #{project}"

  browseConfig: ->
    configPath = path.dirname(@configFile)

    if @fileManager isnt null
      # Does config folder exist?
      try
        fs.accessSync(configPath, fs.F_OK)
      catch error
        atom.notifications.addError(@self, detail: error, dismissable: true)
        return

      # Open config folder
      exec "#{@fileManager} #{configPath}"

  getFileManager: ->
    fm = atom.config.get('browse.linuxFileManager');

    if typeof fm isnt 'undefined'
        console.log "[#{@self}] Load from config: #{fm}"
        return fm

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
          console.log "[#{@self}] Trying: #{fm}"
          exec "which #{fm}", (error, stdout, stderr) ->
            if stdout isnt null
              result = stdout

          if typeof result isnt 'undefined'
            console.log "[#{@self}] Saving #{fm} for future use"
            atom.notifications.addInfo("**#{@self}**: Saving `#{fm}` for future use", dismissable: false)
            atom.config.set('browse.linuxFileManager', fm);
            return fm

        atom.notifications.addWarning("**#{@self}**: No supported file manager detected", dismissable: true)
        return null
