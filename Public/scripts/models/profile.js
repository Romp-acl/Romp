function UserProfile(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.address = user.address;
    this.id = user.owner_id;
    this.petObj = {
        imgUrl : user.imgUrl,
        breed : user.breed,
        sex : user.sex,
        name : user.name,
        age : user.age,
        color : user.color,
        size : user.size,
        temperment : user.temperment,
        interests : user.interests,
        about : user.description
    }
}

UserProfile.all = [];

UserProfile.loadUsers = function() {
    $.getJSON("/userData", function(json) {
        json.map(user => {
            UserProfile.all.push(new UserProfile(user));
        });
    })
    getAddresses();
}

UserProfile.prototype.toHtml = function() {
    var templateFiller = Handlebars.compile($('#user-profile').html());
    var filledTemplate = templateFiller(this);
    return filledTemplate;
}

// function addUser(rawData) {
//     UserProfile.all.push(new UserProfile(rawData));
// }



//loop through the petsinfo array to find the coords and match it with the user address.
//then, add it to the UserProfile
function matchCoords() {
    UserProfile.all.map(eachProfile => {
        petsInfo.map(eachPet => {
            if(eachProfile.address == eachPet.address){
                return eachProfile.coords = eachPet.coordinates;
            }
        })
    })
}




