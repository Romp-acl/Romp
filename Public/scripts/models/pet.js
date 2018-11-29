 function petProfile(img, breed, sex, name, age, color, size, temperment) {
    this.img = img.src;
    this.breed = breed;
    this.sex = sex;
    this.name = name;
    this.age = age;
    this.color = color;
    this.size = size;
    this.temperment = temperment
}

petProfile.all = [];

function addPet(rawData) {
    petProfile.all.push(new petProfile(rawData));
}




