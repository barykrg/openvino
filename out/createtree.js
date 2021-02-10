"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeItems = exports.TreeDataProvider = void 0;
const vscode = require("vscode");
class TreeDataProvider {
    constructor() {
        this.data = [new TreeItems('OpenVino Pull', "Pulls openvino Official image to docker registry", "PullImage"),
            new TreeItems('Create developement environment', "Open a workspace for developement environment", "RunImage"),
            demos()
        ];
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}
exports.TreeDataProvider = TreeDataProvider;
function demos() {
    return new TreeItems('Demos', "Run a demo code", "RunSample", [
        new TreeItems('Demo1', "Run demo1", "demo1"),
        new TreeItems('Demo2', "Run demo2", "demo2")
    ]);
}
class TreeItems extends vscode.TreeItem {
    constructor(label, description, contextValue, children) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Expanded);
        this.description = description;
        this.contextValue = contextValue;
        this.children = children;
    }
}
exports.TreeItems = TreeItems;
//# sourceMappingURL=createtree.js.map