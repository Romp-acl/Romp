var petsInfo = [];

function getAddresses() {
    var addresses = $.getJSON("/petData", function(json) {
<<<<<<< HEAD
        console.log(json);
        json.map(user => {
            petsInfo.push(user);
=======
        json.map(pet => {
            petsInfo.push(pet);
>>>>>>> 3e19bd1b91bd8a6ad7886863be0c5f6d5ed3cb43
        });
    })
    .then(convertLocations);
}

function convertLocations() {
    petsInfo.map(pet => {
        $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?address=${pet['address']}&key=AIzaSyAUOAcCAnV_p17Dryswmj_lbI7SK9EXZjY`, function(json){
            pet.coordinates = (json.results[0].geometry.location);
        })
    })
}


