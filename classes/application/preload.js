const { contextBridge, ipcRenderer } = require('electron')
let class_ws            = require('../connections/WebSocket'), WebSocket;

contextBridge.exposeInMainWorld(
    'electron',
    {
        rgbControl: (r,g,b) => {
            ipcRenderer.send('do-a-thing', [r,g,b])
        }
    }
)

ipcRenderer.on('websocket', function (evt, message) {
    console.log(message); // Returns: {'SAVED': 'File Saved'}
});
