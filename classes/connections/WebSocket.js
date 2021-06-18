'use strict'
const ws    = require('ws');
const TAG   = "WebSocket";
let log     = require('../logger/Logger');

class WebSocket {
    constructor(port) {
        this.devices = new Map();
        this.ws = new ws.Server({port: port});
        this.ws.on('connection', this.connectionHandler);

        this.Logger = new log;
        this.Logger.log(TAG, "started");
    }

    connectionHandler = (ws) => {
        this.Logger.log(TAG, "New Connection");
        ws.on('message', (message)  => this.incomingHandler(message, ws));
        ws.on('close', (e)          => this.handleClose(e, ws));
    }

    incomingHandler = (message, ws) => {
        this.Logger.log(TAG, "Incoming: " + message);
        let json = this.Logger.parseJSON(message);

        if(json.hasOwnProperty("device")){
            if(json.device === "mirror") {
                this.Logger.log(TAG, "Mirror has connected!");
                this.devices.set("mirror", {"websocket": ws});
                this.sendToMirror({"hoi": "Hoi"});
            }
        } else {
            switch (message.type) {
                default:
                    break;
            }
        }

        //switch structure
    }

    handleClose = (e, ws) => {
        this.Logger.log(TAG, "Closed: " + e);
    }

    sendToMirror = (json) => {
        if(this.devices.get("mirror") === undefined) {
            console.log(TAG, "message sending failed, mirror offline");
        } else {
            this.devices.get("mirror").websocket.send(JSON.stringify(json));
        }
    }

    sendMessage = (type, message) => {
        this.ws.send(JSON.stringify({"type": type, "message": message}));
    }

    close = () => {
        this.ws.close();
        this.Logger.log(TAG, "stopped");
    }
}

module.exports = WebSocket