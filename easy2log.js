const fs = require('fs');
const dateFormat = require('dateformat');
const clc = require('cli-color');
const PATH = require('path');

const severityLevels = {
    'info': clc.green.bold,
    'warn': clc.yellow.bold,
    'error': clc.red.bold
};



checkDir(PATH.join(__dirname, 'logs'), true)

var pendingData;
var logInterval = 60000;

setInterval(function() {
    if (pendingData) logAppend(pendingData);
}, logInterval)



function logAppend(data) {
    if (pendingData) {
        var date = dateFormat(new Date(), 'yyyy-mm-dd');
        fs.appendFile(PATH.join(__dirname, 'logs', `${date}.log`), data, function(err) {
            if (err) {
                log('error', 'Error writing log data to disk:\n' + err, 'logSystem', true)
            } else {
                log('info', `Log saved!`, 'logSystem', true)
                pendingData = "";
            }
        });
    } else {
        log('info', `No log to save.`, 'logSystem', true)
    }
}

function log(severity, text, system, nosave) {
    var logType = severityLevels[severity] ? severityLevels[severity] : 0;
    if (!logType) return;

    var time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    var msg = `[${severity}] ${time} [${system}] ${text}`;
    var consoleMsg = `${logType('['+severity+']')} ${clc.blackBright(time)} ${clc.white('['+system+']')} ${logType(text)}`;

    console.log(consoleMsg)
    if (!nosave) {
        pendingData = (pendingData || '') + msg + '\n';
    }

}

function checkDir(path, mkdir) {
    try {
        fs.accessSync(path);
    } catch (err) {
        if (mkdir) makeDir(path);
    }
}


function makeDir(path) {
    try {
        fs.mkdirSync(path)
    } catch (err) {
        log('error', 'Failed to mkdir:\n' + err, 'logSystem', true)
    }
}


var easy2log = {
    "info": function(text, system) {
        log('info', text, system);
    },
    "warn": function(text, system) {
        log('warn', text, system);
    },
    "error": function(text, system) {
        log('error', text, system);
    },
    "save": function() {
        logAppend(pendingData);
    }
}


module.exports = easy2log;