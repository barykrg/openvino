"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeItems = exports.TreeDataProvider = void 0;
const vscode = require("vscode");
class TreeDataProvider {
    constructor(context, num = 0) {
        this.num = num;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        //vscode.window.showInformationMessage("Constructor is made");
    }
    /*
    constructor(){
        this.data = [new TreeItems('.','Get OpenVINO Image',"Pulls openvino Official image to docker registry","PullImage"),
        new TreeItems('.','Create developement environment',"Open a workspace for developement environment","RunImage"),
        demos(),
        new TreeItems('.','c','C Program samples','C',this.cSamples()),
        new TreeItems('.','cpp','CPP Program samples','CPP',this.cppSamples()),
        new TreeItems('.','python','Python Program samples','PYTHON',this.pythonSamples())
    ];
    }*/
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        //vscode.window.showInformationMessage("Cchild is making");
        const images = [];
        images.push(new TreeItems('.', 'Get OpenVINO Image', "Pulls openvino Official image to docker registry", "PullImage"));
        images.push(new TreeItems('.', 'Create development environment', "Open a workspace for developement environment", "RunImage"));
        images.push(demos());
        //vscode.window.showInformationMessage(`Child is made${this.num}`);
        //this.num = this.num+2;
        images.push(new TreeItems('.', 'Samples', 'Samples for different programming language', 'SAMPLES', [
            new TreeItems('.', 'c', 'C Program samples', 'C', this.cSamples()),
            new TreeItems('.', 'cpp', 'CPP Program samples', 'CPP', this.cppSamples()),
            new TreeItems('.', 'python', 'Python Program samples', 'PYTHON', this.pythonSamples())
        ]));
        images.push(new TreeItems('.', 'Documentation', 'Official Documentation of OpenVINO', 'Document'));
        return element === undefined ? images : element.children;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            //this._onDidChangeTreeData.fire;
            //vscode.window.showInformationMessage("Refresh Option!");
        });
    }
    cSamples() {
        const csamples = [];
        /*
        child.exec(`docker exec work ls -F /opt/intel/openvino/inference_engine/samples/c`,(error,stdout,stderr)=>{
            if(error)
            {
                return undefined;
            }
            let arr:string[] = stdout.split('\n').filter((item)=>{
                return item.endsWith('/');
            });
            for(let sample of arr)
            {
                csamples.push(new TreeItems('c',sample.substr(0,sample.length-1),'','Samples'));
            }
        });*/
        let arr = ['common', 'hello_classification', 'input_classification', 'object_detection_sample_ssd'];
        for (let sample of arr) {
            csamples.push(new TreeItems('c', sample.substr(0, sample.length), '', 'Samples'));
        }
        return csamples;
    }
    cppSamples() {
        const csamples = [];
        /*
        child.exec(`docker exec work ls -F /opt/intel/openvino/inference_engine/samples/cpp`,(error,stdout,stderr)=>{
            if(error)
            {
                return undefined;
            }
            let arr:string[] = stdout.split('\n').filter((item)=>{
                return item.endsWith('/');
            });
            for(let sample of arr)
            {
                csamples.push(new TreeItems('cpp',sample.substr(0,sample.length-1),'','Samples'));
            }
        });*/
        let arr = ['hello_query_device',
            'benchmark_app',
            'hello_reshape_ssd',
            'ngraph_function_creation_sample',
            'object_detection_sample_ssd',
            'classification_sample_async',
            'speech_sample',
            'common',
            'style_transfer_sample',
            'hello_classification',
            'thirdparty',
            'hello_nv12_input_classification'
        ];
        for (let sample of arr) {
            csamples.push(new TreeItems('cpp', sample.substr(0, sample.length), '', 'Samples'));
        }
        return csamples;
    }
    pythonSamples() {
        const csamples = [];
        /*
        child.exec(`docker exec work ls -F /opt/intel/openvino/inference_engine/samples/python`,(error,stdout,stderr)=>{
            if(error)
            {
                return undefined;
            }
            let arr:string[] = stdout.split('\n').filter((item)=>{
                return item.endsWith('/');
            });,

            for(let sample of arr)
            {
                csamples.push(new TreeItems('python',sample.substr(0,sample.length-1),'','Samples'));
            }
        });*/
        let arr = ['classification_sample_async',
            'object_detection_sample_ssd',
            'hello_classification',
            'hello_query_device',
            'style_transfer_sample',
            'ngraph_function_creation_sample'
        ];
        for (let sample of arr) {
            csamples.push(new TreeItems('python', sample.substr(0, sample.length), '', 'Samples'));
        }
        return csamples;
    }
}
exports.TreeDataProvider = TreeDataProvider;
function demos() {
    return new TreeItems('.', 'Demos', "Run a demo code", "RunSample", [
        new TreeItems('Demos', 'Vehicle and License Plate Detection', "", "demo1"),
        new TreeItems('Demos', 'Image Classification', "", "demo2")
    ]);
}
class TreeItems extends vscode.TreeItem {
    constructor(parent, label, tooltip, contextValue, children) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed);
        this.parent = parent;
        this.label = label;
        this.tooltip = tooltip;
        this.contextValue = contextValue;
        this.children = children;
    }
}
exports.TreeItems = TreeItems;
//# sourceMappingURL=createtree.js.map