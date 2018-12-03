var locations = [];

function getAddresses() {
    var addresses = $.getJSON("/addresses", function(json) {
        json.map(user => {
            locations.push(user.address);
        });
    })
    .then(convertLocations);
}

var latLngList = [];    

function convertLocations() {
    locations.map(address => {
        $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAUOAcCAnV_p17Dryswmj_lbI7SK9EXZjY`, function(json){
            latLngList.push(json.results[0].geometry.location);
        })
    })
}

