const fs = require('fs')
const logger = require('./logger')

function isExits(path) {
    let ex = fs.existsSync(path) ? true : false;
    if (!ex)
        logger.printError("File doesn't exist "+ path);
    return ex;
}

function WriteFile(path, text) {
    if (isExits(path)) {
        fs.writeFileSync(path, text);
    }
}

function ReadFile(path) {
    if (isExits(path)) {
        return fs.readFileSync(path);
    }
}

module.exports = {isExits, WriteFile, ReadFile}
