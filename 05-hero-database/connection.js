var mongoose = require("mongoose");

function connect() {
    return mongoose.connect("mongodb://localhost:27017/heroes", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

var HeroSchema = new mongoose.Schema({
    name: String,
    heroName: String,
    quirk: String,
});

var HeroModel = mongoose.model("hero", HeroSchema);

connect();

module.exports = { HeroModel };
