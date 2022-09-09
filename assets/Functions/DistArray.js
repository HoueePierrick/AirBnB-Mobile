// Input obj: a couple of lat-long being user's ones
// Input inputarray: list of couples of latlongs inside an object
// Returns an array of objects with two keys
    // ranking: number
    // location: latlong array

const DistArray = (obj, inputarray) => {
    let unrankedArray = []
    let rankedArray = []
    let result = []
    let pushed = {}
    let rank = 1;

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    for(let i = 0; i < inputarray.length; i++) {
      pushed = {
        distance: calcCrow(obj.latitude, obj.longitude, inputarray[i].location[1], inputarray[i].location[0]),
        coords: inputarray[i].location,
        id: inputarray[i].id
      }
      unrankedArray.push(pushed)
      pushed = {}
    }

    for(let j = 0; j < unrankedArray.length; j++) {
      let elem = {}
      for(let k = 0; k < unrankedArray.length; k++) {
        if(unrankedArray[j].distance > unrankedArray[k].distance) 
        {
          rank = rank + 1;
        }
      }
      elem = unrankedArray[j]
      elem.rank = rank;
      rankedArray.push(elem)
      rank = 1;
      elem = {}
    }

    for(let i = 1; i <= 3; i++) {
      for(let j = 0; j < rankedArray.length; j++) {
        if(rankedArray[j].rank === i) {
          result.push(rankedArray[j])
        }
      }
    }
    
    return result
}

module.exports = DistArray