const checkMillionDollarIdea = (req, res, next) => {
    var newIdea = req.body;
    var newIdeaWorth = newIdea.numWeeks * newIdea.weeklyRevenue;
    if (newIdeaWorth >= 1000000) {
        next();
    } else {
        res.status(400).send({
            message: "Not a billion dollar idea",
        });
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
