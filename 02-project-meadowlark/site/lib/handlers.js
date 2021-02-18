const fortuneQuote = require('./fortune')
const handler = {
    home(req, res) {
        res.render('home')
    },
    about(req, res) {
        res.render('about', { quote: fortuneQuote })
    },
    notFound(req, res) {
        res.render('404')
    },
    serverError(err, req, res, next) {
        res.render('500')
    }
}

module.exports = handler