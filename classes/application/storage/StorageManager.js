'use strict'
const Store                 = require('electron-store');
const Logger                = require('../../logger/Logger');
const TAG                   = "StorageManager";

class StorageManager {
    constructor() {
        this.Logger = new Logger;
        this.store = new Store();
    }

}

module.exports = StorageManager