const Stringify = (obj) => {
    console.log(JSON.stringify(obj, null, 2))
}

// console.log(Stringify({name: "A", age: 22, description: {is: "Ok", or: "not"}}))

module.exports = Stringify;