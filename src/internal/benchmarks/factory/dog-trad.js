const DogExplicit = function ({ color, speed, }) {
    this.color = color
    this.speed = speed
}

const DogCycle = function (props) {
    for (let i in props) this[i] = props[i]
}

// const Dog = DogExplicit
const Dog = DogCycle

export default Dog

Dog.prototype.speak = function () { return 'woof' }
