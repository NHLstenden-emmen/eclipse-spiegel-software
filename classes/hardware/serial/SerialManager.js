'use strict'
const SerialPort        = require('serialport')
const Readline          = require('@serialport/parser-readline')
const Logger            = require('../../logger/Logger');
const WifiManager       = require('../../hardware/wifi/WifiManager');
let class_ws                  = require('../../connections/WebSocket'), WebSocket;

let dnssd                     = require('dnssd'),
                                advertisement = new dnssd.Advertisement(dnssd.tcp('eclipse-mirror'), 49154);
const TAG               = "SerialManager";

class SerialManager {
    constructor() {
        SerialPort.list().then( (data) => {
            if(data.length === 0) {
                this.Logger.log(TAG, "ESP32 not found!");
            } else {
                this.tryOpen(data[0].path);
            }
        });
        this.WifiManager = new WifiManager;
        this.WebSocket   = new class_ws(49154);

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
        });
    }

    dataHandler = (data) => {
        try {
                let json = JSON.parse(data);
                switch (json.type) {
                    case 'wifi-connect':              
                    console.log(json);              
                           this.WifiManager.connect(json.body.ssid, json.body.password);
                            this.port.write('{"status": "true"}', function(err) {
                                if (err) {
                                    return console.log('Error on write: ', err.message)
                                }
                                console.log('message written success')
                            });
                    
                            advertisement.start();
                            this.Logger.log("mDNS", advertisement.state);  
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
