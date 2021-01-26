// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as commands from './commands';
import * as utils from './utils';
import * as langserver from './langserver';

import * as path from 'path';

import { outputChannel } from './status';

import { platform } from 'os';

const cmds: any = {
	'wake.version': commands.version,
	'wake.build': commands.build,
	'wake.rebuild': commands.rebuild,
	'wake.run': commands.run,
	'wake.rerun': commands.rerun,
	'wake.geninfo': commands.geninfo,
}

let wonkeyStatusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('wonkey: "vscode-wonkey" extension is now active!');
	//console.log('wonkey: os.platform(): ' + platform());
	//console.log("wonkey: Host OS: " + utils.getWonkeyHostOS());
	//console.log("wonkey: Wonkey root path: " + utils.getWonkeyRootPath());
	//console.log("wonkey: Build config: " + utils.getWonkeyBuildConfig());
	//console.log("wonkey: Build target: " + utils.getWonkeyBuildTarget());
	//console.log("wonkey: Build apptype: " + utils.getWonkeyBuildAppType());
	//console.log("wonkey: Wake executable path: " + utils.getWakeExecCommand());
	//console.log("wonkey: Current working directoty path: " + utils.getCwd());
	//console.log("wonkey: Current working directoty name: " + utils.getWorkspaceFolder().name);
	//console.log("wonkey: Current document directory: " + path.basename(path.dirname(utils.getCurrentDocument().fileName)));
	//console.log("wonkey: Current document path: " + utils.getCurrentDocument().fileName);
	//console.log("wonkey: __dirname: " + __dirname);
	//console.log("wonkey: __filename: " + __filename);

	// Commands
	for (const cmd in cmds) {
		const handler = cmds[cmd];
		const disposable = vscode.commands.registerCommand(cmd, handler);
		context.subscriptions.push(disposable);
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('wake.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello Wonkey!');
	});

	context.subscriptions.push(disposable);

	// Configuration changes
	const isWlsEnable = utils.getWorkspaceConfig().get<boolean>('wls.enable');

	vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
		// Update WLS state
		if(e.affectsConfiguration('wonkey.wls.enable')) {
			const isWlsEnable = utils.getWorkspaceConfig().get<boolean>('wls.enable');
			if (isWlsEnable) {
				//activateWls(context);
			} else {
				//deactivateWls();
			}
		}

		// Update status bar
		if(e.affectsConfiguration('wonkey.build.target') || e.affectsConfiguration('wonkey.build.config')) {
			const target = utils.getWorkspaceConfig().get<boolean>('build.target');
			const config = utils.getWorkspaceConfig().get<boolean>('build.config');
			wonkeyStatusBarItem.text = '$(play) Run '+target+' '+config;
		}
	});

	if (isWlsEnable) {
		//activateWls(context);
	}

	// Status bar
	wonkeyStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
	wonkeyStatusBarItem.text = '$(play) Run '+utils.getWonkeyBuildTarget()+' '+utils.getWonkeyBuildConfig();
	wonkeyStatusBarItem.tooltip = 'Run current Wonkey file';
	wonkeyStatusBarItem.command = 'wake.run';
	context.subscriptions.push(wonkeyStatusBarItem);
	wonkeyStatusBarItem.show();
}

// this method is called when your extension is deactivated
export function deactivate() {}
