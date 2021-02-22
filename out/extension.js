"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const createtree = require("./createtree");
const functionality = require("./functionality");
function activate(context) {
    let sampleData = new createtree.TreeDataProvider(context);
    functionality.checkFunction(); // Checks if docker is installed or not.
    context.subscriptions.push(vscode.window.createTreeView("openvinofunctions", { "treeDataProvider": sampleData }));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.rundemo1", functionality.rundemo1));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.rundemo2", functionality.rundemo2));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.openvinopull", functionality.openvinopull));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.create", functionality.create));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.readme", functionality.readme));
    //context.subscriptions.push(vscode.commands.registerCommand("openvino.runandmount",functionality.runandmount));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.runandmount", (sampleData) => functionality.runandmount(sampleData)));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map