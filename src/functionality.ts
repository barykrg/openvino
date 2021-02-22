import * as child from 'child_process';
import * as vscode from 'vscode';
import * as createtree from './createtree';
	export function create(sample:createtree.TreeItems)
	{
		//console.log(sample.parent);
		//vscode.window.showInformationMessage(sample.label);
		child.exec(`docker exec work cp -r /opt/intel/openvino/inference_engine/samples/${sample.parent}/${sample.label} /opt/intel/openvino/myDir/${sample.parent}`,(error)=>{
			if(error)
			{
				vscode.window.showErrorMessage("Please create development environment first");
				return;
			}
		});
	}
	export function checkFunction()
	{
		child.exec('docker info',async (error,stdout,stderr)=>
			{
				if(error)
				{
					vscode.window.showErrorMessage("Please install docker on your system.\n Do you want to learn how to install and setup docker on your system?","Yes","No")
					.then((choose)=>{
						if (choose==="Yes")
						{
							vscode.env.openExternal(vscode.Uri.parse("https://docs.docker.com/engine/install/"));
						}
					})
					.then(undefined=>{return;});
					return;
				}
			});
	}
	export function readme()
	{
		
		vscode.env.openExternal(vscode.Uri.parse("https://docs.openvinotoolkit.org/latest/documentation.html"));
	
	}
	
	export function openvinopull()
	{
		child.exec('docker pull openvino/ubuntu18_data_dev',async (error,stdout,stderr)=>
			{
				if(error){
					vscode.window.showErrorMessage("Please configure your docker setup properly!");
					return;
				}
				vscode.window.showInformationMessage("openVino Image pulled successfully");
			});
	}
	
	export function rundemo1()
	{
		let term = vscode.window.createTerminal("Demo Shell");
		term.show(true);
		term.sendText('docker run -it -u 0 --rm openvino/ubuntu18_data_dev  /bin/bash -c "apt update && apt install sudo && deployment_tools/demo/demo_security_barrier_camera.sh -d CPU -sample-options -no_show"',true);
	
	}
	
	export function rundemo2()
	{
		let term = vscode.window.createTerminal("Demo Shell");
		term.show(true);
		term.sendText('docker run -it -u 0 --rm openvino/ubuntu18_data_dev  /bin/bash -c "apt update && apt install sudo && deployment_tools/demo/demo_squeezenet_download_convert_run.sh -d CPU -sample-options -no_show"',true);
	
	}
	export  function runandmount(sampleData:createtree.TreeDataProvider)
	{
		
		 vscode.window.showOpenDialog({canSelectFolders:true})
		.then(folder =>
		{
			if(folder===undefined)
			{
				vscode.window.showErrorMessage("Error while opening a file");
				return;
			}
			let folderpath = folder[0].fsPath;
			//vscode.window.showInformationMessage(folderpath);
			vscode.workspace.updateWorkspaceFolders(0,0,{uri:vscode.Uri.file(folderpath)});
			let term = vscode.window.createTerminal("Docker Shell");
			term.show(true);
			term.sendText(`docker rm -f work`);
			term.sendText(`docker run -it --name work -u 0 --rm --mount type=bind,source="${folderpath}",target=/opt/intel/openvino/myDir openvino/ubuntu18_data_dev`,true);
			//sampleData.cSamples();
			//sampleData.cppSamples();
			//sampleData.pythonSamples();
			//sampleData.refresh();
		})
		.then(undefined,err =>{vscode.window.showErrorMessage("Error while opening a file"); return;});
		
		console.log("Test!!");
		
	}
	
