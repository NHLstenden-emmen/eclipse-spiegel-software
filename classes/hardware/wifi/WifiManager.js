'use strict'
const wifi                  = require('node-wifi');
let Logger                  = require('../../logger/Logger');
const TAG                   = "WifiManager";

class WifiManager {
    constructor() {
        wifi.init({iface: null});
        this.Logger = new Logger;
    }

    connect = (ssid, pass) => {
        wifi.connect({ssid: ssid, password: pass}, error => {
            if (error) {
                this.Logger.log(TAG, "Error connecting to wifi!");
            } else  {
                this.Logger.log(TAG, "Error successfully connected to WiFi!");
            }
        });
    }

    disconnect = () => {
        wifi.disconnect();
        this.Logger.log(TAG, "Wifi has disconnected!");
    }
}

module.exports = WifiManager