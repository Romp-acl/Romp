function UserProfile(user) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.address = user.address;
    this.id = user.owner_id;
    this.petObj = {
        imgUrl : user.imgurl,
        breed : user.breed,
        sex : user.sex,
        name : user.name,
        age : user.age,
        color : user.color,
        size : user.size,
        temperment : user.temperment,
        interests : user.interests,
        about : user.description,
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

UserProfile.prototype.insertRecord = function() {
    console.log(this);
    $.post('/regForm', JSON.parse(JSON.stringify(this)))
    .then(console.log);
};

$( "#regBtn" ).on( "click", function(event) {
    event.preventDefault();
    
    let addUser = new UserProfile({
        username: $("input[name=new-username]").val(),
        password: $("input[name=new-password]").val(),
        email: $("input[name=email]").val(),
        address: $("input[name=address]").val(),
        imgurl: $("input[name=petIMG]").val(),
        breed: $("input[name=breed]").val(),
        sex: $("input[name=sex]").val(),
        name: $("input[name=petname]").val(),
        age: $("input[name=petage]").val(),
        color: $("input[name=petcolor]").val(),
        size: $("input[name=petsize]").val(),
        temperment: $("input[name=pettemperment]").val(),
        interests: $("input[name=petinterest]").val(),
        description: $("input[name=petabout]").val(),
    });
    console.log(addUser);
    addUser.insertRecord();
  });





