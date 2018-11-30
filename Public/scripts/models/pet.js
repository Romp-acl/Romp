 function PetProfile(img, breed, sex, name, age, color, size, temperment, interests) {
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

PetProfile.all = [];

function addPet(rawData) {
    PetProfile.all.push(new petProfile(rawData));
}




