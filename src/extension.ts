
import * as vscode from 'vscode';
import * as createtree from './createtree';
import * as functionality from './functionality';

export function activate(context: vscode.ExtensionContext) {
	functionality.checkFunction(); // Checks if docker is installed or not.
	vscode.window.registerTreeDataProvider("openvinofunctions",new createtree.TreeDataProvider());
	context.subscriptions.push(vscode.commands.registerCommand("openvino.rundemo1",functionality.rundemo1));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.rundemo2",functionality.rundemo2));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.openvinopull",functionality.openvinopull));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.runandmount",functionality.runandmount));
}

// this method is called when your extension is deactivated
export function deactivate() {
	functionality.deactivate();
}
