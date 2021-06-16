const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'electron',
    {
        rgbControl: (r,g,b) => {
            ipcRenderer.send('do-a-thing', [r,g,b])
        }
    }
)
