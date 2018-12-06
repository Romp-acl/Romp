function UserProfile(user) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.address = user.address;
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
}

UserProfile.prototype.toHtml = function() {
    var templateFiller = Handlebars.compile($('#user-profile').html());
    var filledTemplate = templateFiller(this);
    return filledTemplate;
}









