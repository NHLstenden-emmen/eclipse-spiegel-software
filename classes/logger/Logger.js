'use strict'

class Logger {
    log = (tag, text) => {
        console.log("Eclipse [" + tag + "]: " + text);
    }

    parseJSON = (json) => {
        let string = JSON.stringify(json);
        return JSON.parse(JSON.parse(string));
    }
}

module.exports = Logger