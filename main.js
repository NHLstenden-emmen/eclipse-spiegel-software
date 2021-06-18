const path                    = require('path')
const { app, ipcMain } = require("electron");

ipcMain.on("do-a-thing", (event, arg) => {
    Serial.rgb(arg[0], arg[1], arg[2]);
});

let class_window              = require('./classes/application/Window'), Window;
let class_logger              = require('./classes/logger/Logger'), Logger;
let class_wifi                = require('./classes/hardware/wifi/WifiManager'), Wifi;
let class_serial              = require('./classes/hardware/serial/SerialManager'), Serial;
//let class_storage             = require('./classes/application/storage/StorageManager'), Storage;

const createWindow = () => {
    Window = new class_window({
        file: path.join(__dirname, "pages/", "index.html")
    });
}

const ready = () => {

    Logger      = new class_logger;
    Serial      = new class_serial;

    createWindow();

    Window.on('closed', () => {
        Window = null;
    })
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

 