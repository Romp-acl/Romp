function UserProfile(username, password, email, address) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.address = address;
}

UserProfile.all = [];

function addUser(rawData) {
    UserProfile.all.push(new UserProfile(rawData));
}







