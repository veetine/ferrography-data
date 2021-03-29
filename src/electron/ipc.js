//import { ipcRenderer } from "electron";
const { ipcRenderer } = require('electron')
function ipcSend(str, params) {
  ipcRenderer.send(str, params);
}
function ipcListen(str, cb) {
  if (typeof cb === "function") {
    ipcRenderer.removeAllListeners(str);
    ipcRenderer.on(str, cb);
  }
}

export { ipcListen, ipcSend };
