'use strict'
const WiFiControl = require('wifi-control');

let Logger                  = require('../../logger/Logger');
const TAG                   = "WifiManager";

class WifiManager {
    constructor() {
        WiFiControl.init({
            debug: true,
            iface: 'wlan0'
          });        
          
          this.Logger = new Logger;
    }

    connect = (ssid, pass) => {
          WiFiControl.connectToAP( {
            ssid: ssid,
            password: pass
          }, function(err, response) {
            if (err) {
                console.log(err);
                return false;
            } else {
                console.log(response);
                return true;
            }
          });
    }

    disconnect = () => {
        wifi.disconnect();
        this.Logger.log(TAG, "Wifi has disconnected!");
    }
}

module.exports = WifiManager