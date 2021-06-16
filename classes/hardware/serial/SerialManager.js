'use strict'
const SerialPort        = require('serialport')
const Readline          = require('@serialport/parser-readline')
const Logger            = require('../../logger/Logger');
const WifiManager       = require('../../hardware/wifi/WifiManager');

const TAG               = "SerialManager";

class SerialManager {
    constructor() {
       // this.tryOpen('COM3');

        SerialPort.list().then( (data) => {
            if(data.length === 0) {
                this.Logger.log(TAG, "ESP32 not found!");
            } else {
                this.tryOpen(data[0].path);
            }
        });
        this.WifiManager = new WifiManager;

        this.Logger = new Logger;
        this.Logger.log(TAG, "started");
    }

    tryOpen = (port) => {
        this.port = new SerialPort(port, {
            autoOpen: false,
            baudRate: 115200});

        this.openPort();
        this.parser = this.port.pipe(new Readline({ delimiter: '\r\n' }));
        this.parser.on('data', this.dataHandler)
    }

    openPort = () => {
        this.port.open((err) => {
            if (err) {
                this.Logger.log(TAG, "Error opening port, could not connect to ESP32: " + err.message);
            } else {
                this.Logger.log(TAG, "ESP32 connected");
            }
        });
    }

    rgb = (r,g,b) => {
        let json = '{"r": "'+ r +'", "g": "'+ g +'", "b": "'+ b +'"}';
        console.log(json)
        this.port.write(json, function(err) {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
            console.log('message written')
        })
    }

    dataHandler = (data) => {
        try {
                let json = JSON.parse(data);
                switch (json.type) {
                    case 'wifi-connect':
                            let ssid = json.ssid;
                            let password = json.password;
                            this.WifiCredentialsRead = true;
                            this.WifiManager.connect(ssid, password);
                        break;
                    default:
                            this.Logger.log(TAG, "ESP32: " + data);
                        break;
                }
        }
        catch (e) {
            this.Logger.log(TAG, "ESP32: " + data);
        }
       // console.log(JSON.parse(data));
    }

}

module.exports = SerialManager
