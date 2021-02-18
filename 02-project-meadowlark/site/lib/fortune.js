const quote = [
    "Conquer your fears or they will conquer you",
    "What is the point if those with the means and power do not fight?",
    "Do not fear what you don't know.",
    "Whenever possible, keep it simple."
]

function getFortune() {
    return quote[Math.floor(Math.random() * quote.length)]
}
module.exports = getFortune();