const fs = require("fs");

function readFile(filePath) {
    var fileData = fs.readFileSync(filePath);
    return fileData;
}

function writeFile(filePath, fileData) {
    fs.writeFileSync(filePath, fileData);
}

module.exports = { readFile, writeFile };
