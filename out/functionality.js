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
exports.runandmount = exports.rundemo2 = exports.rundemo1 = exports.openvinopull = exports.checkFunction = exports.deactivate = void 0;
const child = require("child_process");
const vscode = require("vscode");
function deactivate() {
    child.exec(`docker rm -f $(docker pa -a -q)`);
}
exports.deactivate = deactivate;
function checkFunction() {
    child.exec('docker info', (error, stdout, stderr) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            let choose = yield vscode.window.showErrorMessage("Please install docker on your system.\n Do you want to learn how to install and setup docker on your system?", "Yes", "No");
            if (choose === "Yes") {
                vscode.env.openExternal(vscode.Uri.parse("https://docs.docker.com/engine/install/"));
            }
        }
    }));
}
exports.checkFunction = checkFunction;
function openvinopull() {
    child.exec('docker pull openvino/ubuntu18_data_dev', (error, stdout, stderr) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            vscode.window.showErrorMessage("Please configure your docker setup properly!");
            return;
        }
        vscode.window.showInformationMessage("openVino Image pulled successfully");
    }));
}
exports.openvinopull = openvinopull;
function rundemo1() {
    let term = vscode.window.createTerminal("Demo Shell");
    term.show(true);
    term.sendText('docker run -it -u 0 --rm openvino/ubuntu18_data_dev  /bin/bash -c "apt update && apt install sudo && deployment_tools/demo/demo_security_barrier_camera.sh -d CPU -sample-options -no_show"', true);
}
exports.rundemo1 = rundemo1;
function rundemo2() {
    let term = vscode.window.createTerminal("Demo Shell");
    term.show(true);
    term.sendText('docker run -it -u 0 --rm openvino/ubuntu18_data_dev  /bin/bash -c "apt update && apt install sudo && deployment_tools/demo/demo_squeezenet_download_convert_run.sh -d CPU -sample-options -no_show"', true);
}
exports.rundemo2 = rundemo2;
function runandmount() {
    return __awaiter(this, void 0, void 0, function* () {
        const folder = yield vscode.window.showOpenDialog({ canSelectFolders: true });
        if (folder) {
            let folderpath = folder[0].fsPath;
            vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.file(folderpath) });
            let term = vscode.window.createTerminal("Docker Shell");
            term.show(true);
            term.sendText(`docker rm -f work`);
            term.sendText(`docker run -it --name work -u 0 --rm --mount type=bind,source=${folderpath},target=/opt/intel/openvino/myDir openvino/ubuntu18_data_dev`, true);
        }
    });
}
exports.runandmount = runandmount;
//# sourceMappingURL=functionality.js.map