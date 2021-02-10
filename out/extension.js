"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const createtree = require("./createtree");
const functionality = require("./functionality");
function activate(context) {
    functionality.checkFunction(); // Checks if docker is installed or not.
    vscode.window.registerTreeDataProvider("openvinofunctions", new createtree.TreeDataProvider());
    context.subscriptions.push(vscode.commands.registerCommand("openvino.rundemo1", functionality.rundemo1));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.rundemo2", functionality.rundemo2));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.openvinopull", functionality.openvinopull));
    context.subscriptions.push(vscode.commands.registerCommand("openvino.runandmount", functionality.runandmount));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    functionality.deactivate();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map