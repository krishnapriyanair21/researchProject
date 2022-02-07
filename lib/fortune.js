// will be hidden (ie private)
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
  ]

  //available outside of this function
exports.getFortune = () => {
    const x = Math.floor(Math.random()*fortunes.length)
    return fortunes[x]
}