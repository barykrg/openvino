import * as vscode from 'vscode';
import * as child from 'child_process';

export class TreeDataProvider implements vscode.TreeDataProvider<TreeItems> {
	public _onDidChangeTreeData: vscode.EventEmitter<TreeItems|undefined> = new vscode.EventEmitter<TreeItems|undefined>();
	readonly onDidChangeTreeData: vscode.Event<TreeItems|undefined> | undefined = this._onDidChangeTreeData.event;
	data: TreeItems[] | undefined;
	constructor(context:vscode.ExtensionContext,public num:any = 0)
	{
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
	public getTreeItem(element: TreeItems): vscode.TreeItem{
		return element;
	}
	public getChildren(element?: TreeItems|undefined): vscode.ProviderResult<TreeItems[]> {
		//vscode.window.showInformationMessage("Cchild is making");
		const images = [];
		images.push(new TreeItems('.','Get OpenVINO Image',"Pulls openvino Official image to docker registry","PullImage"));
		images.push(new TreeItems('.','Create development environment',"Open a workspace for developement environment","RunImage"));
		images.push(demos());
		//vscode.window.showInformationMessage(`Child is made${this.num}`);
		//this.num = this.num+2;
		images.push(new TreeItems('.','Samples','Samples for different programming language','SAMPLES',[
			new TreeItems('.','c','C Program samples','C',this.cSamples()),
			new TreeItems('.','cpp','CPP Program samples','CPP',this.cppSamples()),
			new TreeItems('.','python','Python Program samples','PYTHON',this.pythonSamples())
			
		]));
		images.push(new TreeItems('.','Documentation','Official Documentation of OpenVINO','Document'));
		return element===undefined?images:element.children;
	}
	async refresh():Promise<void>
	{
		//this._onDidChangeTreeData.fire;
		//vscode.window.showInformationMessage("Refresh Option!");
	}
		
	public cSamples():TreeItems[]|undefined{  
		const csamples:TreeItems[] = [];
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
		let arr:String[] = ['common','hello_classification','input_classification','object_detection_sample_ssd'];
		for(let sample of arr)
		{
			csamples.push(new TreeItems('c',sample.substr(0,sample.length),'','Samples'));
		}
		return csamples;
	}

	public cppSamples():TreeItems[]|undefined{  
		const csamples:TreeItems[] = [];
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
		let arr:String[] = ['hello_query_device',
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
		for(let sample of arr)
		{
			csamples.push(new TreeItems('cpp',sample.substr(0,sample.length),'','Samples'));
		}
		return csamples;
	}
	public pythonSamples():TreeItems[]|undefined{  
		const csamples:TreeItems[] = [];
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
		let arr:String[] = ['classification_sample_async',
		    'object_detection_sample_ssd',
			'hello_classification',
			'hello_query_device',
			'style_transfer_sample',
			'ngraph_function_creation_sample'
			];
		for(let sample of arr)
		{
			csamples.push(new TreeItems('python',sample.substr(0,sample.length),'','Samples'));
		}
		return csamples;
	}
	
	
}
function demos():TreeItems{
	return new TreeItems('.','Demos',"Run a demo code","RunSample",[
		new TreeItems('Demos','Vehicle and License Plate Detection',"","demo1"),
		new TreeItems('Demos','Image Classification',"","demo2")
	]);
}

export class TreeItems extends vscode.TreeItem{
	children : TreeItems[]|undefined;
	constructor(public parent:string,
		public label:string,
		public tooltip?:string,
		public contextValue?:string,
		children?:TreeItems[]){
		super(
			label,
			children===undefined ? vscode.TreeItemCollapsibleState.None:vscode.TreeItemCollapsibleState.Collapsed
			);
		this.children = children;
	}
	 
}