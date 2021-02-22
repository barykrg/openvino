"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleTreeItems = exports.pythonSamples = exports.cppSamples = exports.cSamples = exports.SampleTreeDataProvider = void 0;
const vscode = require("vscode");
const child = require("child_process");
class SampleTreeDataProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.data = [
            new SampleTreeItems('.', 'c', 'C Program samples', 'C', cSamples()),
            new SampleTreeItems('.', 'cpp', 'CPP Program samples', 'CPP', cppSamples()),
            new SampleTreeItems('.', 'python', 'Python Program samples', 'PYTHON', pythonSamples()),
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
exports.SampleTreeDataProvider = SampleTreeDataProvider;
function cSamples() {
    const csamples = [];
    child.exec(`docker exec work ls -F /opt/intel/openvino/inference_engine/samples/c`, (error, stdout, stderr) => {
        let arr = stdout.split('\n').filter((item) => {
            return item.endsWith('/');
        });
        for (let sample of arr) {
            csamples.push(new SampleTreeItems('c', sample.substr(0, sample.length - 1), '', 'Samples'));
        }
    });
    return csamples;
}
exports.cSamples = cSamples;
function cppSamples() {
    const csamples = [];
    child.exec(`docker exec work ls -F /opt/intel/openvino/inference_engine/samples/cpp`, (error, stdout, stderr) => {
        let arr = stdout.split('\n').filter((item) => {
            return item.endsWith('/');
        });
        for (let sample of arr) {
            csamples.push(new SampleTreeItems('cpp', sample.substr(0, sample.length - 1), '', 'Samples'));
        }
    });
    return csamples;
}
exports.cppSamples = cppSamples;
function pythonSamples() {
    const csamples = [];
    child.exec(`docker exec work ls -F /opt/intel/openvino/inference_engine/samples/python`, (error, stdout, stderr) => {
        let arr = stdout.split('\n').filter((item) => {
            return item.endsWith('/');
        });
        for (let sample of arr) {
            csamples.push(new SampleTreeItems('python', sample.substr(0, sample.length - 1), '', 'Samples'));
        }
    });
    return csamples;
}
exports.pythonSamples = pythonSamples;
class SampleTreeItems extends vscode.TreeItem {
    constructor(parent, label, tooltip, contextValue, children) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed);
        this.parent = parent;
        this.label = label;
        this.tooltip = tooltip;
        this.contextValue = contextValue;
        this.children = children;
    }
}
exports.SampleTreeItems = SampleTreeItems;
//# sourceMappingURL=sampletree.js.map