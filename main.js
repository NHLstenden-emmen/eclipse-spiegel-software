const path                    = require('path')
const {app, ipcMain}          = require("electron");
const ws                      = require('ws');

let class_window              = require('./classes/application/Window'), Window;
let class_logger              = require('./classes/logger/Logger'), Logger;
let class_serial              = require('./classes/hardware/serial/SerialManager'), Serial;
//let class_storage             = require('./classes/application/storage/StorageManager'), Storage;
let ws_server;

ipcMain.on("do-a-thing", (event, arg) => {
    Serial.rgb(arg[0], arg[1], arg[2]);
});

const createWindow = () => {
    Window = new class_window({
        file: path.join(__dirname, "pages/", "index.html")
    });
}

const ready = () => {
    createWindow();

    ws_server = new ws.Server({port: 49154});
    ws_server.on('connection', connectionHandler);

    Logger      = new class_logger;
    Serial      = new class_serial;

    setInterval(() => {
       // Window.webContents.send('websocket', {'SAVED': 'File Saved'});
    }, 1000);

    Window.on('closed', () => {
        Window = null;
    })
}

const connectionHandler = (ws) => {
    console.log("new conneciton");
    ws.on('message', (message)  => incomingHandler(message, ws));
    ws.on('close', (e)          => handleClose(e, ws));
}

const incomingHandler = (message, ws) => {
    Window.webContents.send('websocket', {'message': message});

    console.log("Incoming: " + message)
    let json = this.Logger.parseJSON(message);

    switch (json.type) {
        default:
            break;
    }
    //switch structure
}

const handleClose = (e, ws) => {
    console.log("Closed: " + e);
}

const close = () => {
    if (process.platform !== 'darwin') {
        WebSocket.close();
        app.quit()
    }
}

app.allowRendererProcessReuse = false
app.on('ready', ready)
app.on('window-all-closed', close);

app.on('activate', function() {
    if (Window === null) {
        createWindow()
    }
})

