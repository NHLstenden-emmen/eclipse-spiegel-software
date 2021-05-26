'use strict'
const { BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// default window settings
const defaultProps = {
   // frame: false,
    //alwaysOnTop: true,
    backgroundColor: '#000000',
    show: false,
    webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js')
    }
}

class Window extends BrowserWindow {
    constructor ({file, ...windowSettings }) {
        // calls new BrowserWindow with these props
        super({ ...defaultProps, ...windowSettings });

        // load the html and open devtools
        this.loadFile(file);
        this.webContents.openDevTools()

        // gracefully show when ready to prevent flickering
        this.once('ready-to-show', () => {
          //  this.show();
        //    this.setKiosk(true);
        });
    }
}

module.exports = Window