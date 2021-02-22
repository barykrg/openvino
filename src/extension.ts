
import * as vscode from 'vscode';
import * as createtree from './createtree';
import * as functionality from './functionality';

export function activate(context: vscode.ExtensionContext) {
	let sampleData = new createtree.TreeDataProvider(context);

	functionality.checkFunction(); // Checks if docker is installed or not.
	
	context.subscriptions.push(vscode.window.createTreeView("openvinofunctions",{"treeDataProvider":sampleData}));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.rundemo1",functionality.rundemo1));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.rundemo2",functionality.rundemo2));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.openvinopull",functionality.openvinopull));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.create",functionality.create));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.readme",functionality.readme));
	//context.subscriptions.push(vscode.commands.registerCommand("openvino.runandmount",functionality.runandmount));
	context.subscriptions.push(vscode.commands.registerCommand("openvino.runandmount",(sampleData:createtree.TreeDataProvider)=>functionality.runandmount(sampleData)));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
