function UserProfile(username, password, email, address) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.address = address;
    this.newPet = function PetProfile(img, breed, sex, name, age, color, size, temperment, interests) {
        this.img = img;
        this.breed = breed;
        this.sex = sex;
        this.name = name;
        this.age = age;
        this.color = color;
        this.size = size;
        this.temperment = temperment;
        this.interest = interests;
        this.about = about;
    }
    this.pets = [];
}

UserProfile.all = [];









