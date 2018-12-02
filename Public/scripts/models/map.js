var locations = [];

function getAddresses() {
    var addresses = $.getJSON("/addresses", function(json) {
        json.map(user => {
            locations.push(user.address);
        });
    })
}

function convertLocation() {
    var latLngList = [];    
    locations.map(address => {
        var latLng = $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAUOAcCAnV_p17Dryswmj_lbI7SK9EXZjY`, function(json){
            latLngList.push(json.results[0].geometry.location);
        })
    })
}