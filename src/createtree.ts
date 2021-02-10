import * as vscode from 'vscode';

export class TreeDataProvider implements vscode.TreeDataProvider<TreeItems> {
	onDidChangeTreeData?: vscode.Event<TreeItems|null|undefined> | undefined;
	
	data: TreeItems[] | undefined;
	constructor(){
		this.data = [new TreeItems('OpenVino Pull',"Pulls openvino Official image to docker registry","PullImage"),
		new TreeItems('Create developement environment',"Open a workspace for developement environment","RunImage"),
		demos()
	];
	}
	getTreeItem(element: TreeItems): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	getChildren(element?: TreeItems|undefined): vscode.ProviderResult<any[]> {
		if(element===undefined){
			return this.data;
		} 
		return element.children;
	}
	
	
}
function demos():TreeItems{
	return new TreeItems('Demos',"Run a demo code","RunSample",[
		new TreeItems('Demo1',"Run demo1","demo1"),
		new TreeItems('Demo2',"Run demo2","demo2")
	]);
}
export class TreeItems extends vscode.TreeItem{
	children : TreeItems[]|undefined;
	constructor(label:string,public description:string,public contextValue?:string,children?:TreeItems[]){
		super(
			label,
			children===undefined ? vscode.TreeItemCollapsibleState.None:vscode.TreeItemCollapsibleState.Expanded);
		this.children = children;
	}
	
}