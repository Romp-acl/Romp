var petsInfo = [];

function getAddresses() {
    var addresses = $.getJSON("/petData", function(json) {
        json.map(user => {
            petsInfo.push(user);
        });
    })
    .then(convertLocations);
}

var latLngList = [];    

function convertLocations() {
    petsInfo.map(pet => {
        $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${pet['address']}&key=AIzaSyAUOAcCAnV_p17Dryswmj_lbI7SK9EXZjY`, function(json){
            pet.coordinates = (json.results[0].geometry.location);
        })
    })
}

