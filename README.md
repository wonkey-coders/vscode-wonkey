# vscode-wonkey

*Currently WIP*

This extension is planned to add language support for the Wonkey Programming Language to Visual Studio Code.

## Features

- [x] Syntax highlighting
- [x] Extension settings
- [x] Status bar button to *run* application with current build settings.
- [x] Commands palette :
    - `wake.version`: show Wake version
    - `wake.check`: check current file
    - `wake.build`: build current file
    - `wake.run`: run current file
    - `wake.rebuild`: clean and build current file
    - `wake.rerun`: clean and run current file
    - `wake.geninfo`: semant and generate geninfo file
## TODO

- Syntax hightligther based on geninfo (AST).
- Wonkey Language Server (WLS)

## Extension Settings

This extension contributes the following settings:

* `wonkey.rootPath`: path to Wonkey root folder
* `wonkey.build.apptype`: specifie output application type
* `wonkey.build.target`: specifie build target
* `wonkey.build.config`: specifie build configuration
* `wonkey.build.verbose`: enable output verbose level

*WIP*

* `wonkey.wls.customPath`: custom path to the WLS (Wonkey Language Server) executable. Restart is required to take effect.
* `wonkey.wls.enable`: enable WLS (Wonkey Language Server)
* `wonkey.wls.enableFeatures`: enables specific language server features. Multiple values must be separated with a comma (,)
* `wonkey.wls.disableFeatures`: disables specific language server features. Multiple values must be separated with a comma (,)

## Known Issues

* Syntax highlighting
* Command palette: `wake.version`

**Enjoy!**
