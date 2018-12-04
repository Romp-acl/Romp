function UserProfile(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.address = user.address;
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

// function addUser(rawData) {
//     UserProfile.all.push(new UserProfile(rawData));
// }









