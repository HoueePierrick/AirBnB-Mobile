const ExtrLatLng = (array) => {
    let result = [];

    for(let i = 0; i < array.length; i++) {
        // console.log(array[i].location)
        result.push({location: array[i].location, id: array[i]._id})
    }
    
    // console.log(result)
    return result
}

module.exports = ExtrLatLng