var fs = require("fs");
var { HeroModel } = require("./connection");

function readJSONFile() {
    var stringData = fs.readFileSync("./heroes.json");
    var heroesObject = JSON.parse(stringData);
    for (let objectKey in heroesObject) {
        HeroModel.create(heroesObject[objectKey]);
    }
}

readJSONFile();
