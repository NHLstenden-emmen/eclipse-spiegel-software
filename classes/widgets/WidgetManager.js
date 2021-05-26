'use strict'
const fs                        = require("fs");
const path                      = require('path')
const util                      = require('util');
const Logger                    = require('../logger/Logger');
const TAG                       = "WidgetManager";
const basePath                  = path.join(__dirname, '..', '..', 'widgets');

class WidgetManager {
    constructor() {
        this.Logger = new Logger;
    }

    getDirectories = async () => {
            let promises;
        fs.readdir(basePath, (err, files) => {
            promises = files.map((fileName) => {
                let fullPath = path.join(basePath, fileName);

                return new Promise((resolve, reject) => {
                    fs.stat(fullPath, (err, stat) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        if(stat.isDirectory()) {
                            const readFile = util.promisify(fs.readFile);
                            readFile(path.join(fullPath, "info.json")).then(r => {
                                let json = JSON.parse(r.toString('utf8'));

                                let widget = {
                                    name: json.name,
                                    description: json.description,
                                    version: json.version,
                                    icon: json.icon
                                };

                                resolve(widget);
                            }).catch(e => {
                                this.Logger.log(TAG, "info.json not found for widget: " + fileName);
                            });
                        }
                    });
                });
            });
        });
        Promise.all(promises).then((values) => {
            //let data = values.filter((obj) => !obj.isFile);
            //  console.log(values);
            return values;
        }, (reason) => {
            console.log("Not all the promise resolved");
            console.log(reason);
        });
    }
}

module.exports = WidgetManager