const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const conString = 'postgres://localhost:5432';
const client = new pg.Client(conString);

client.connect();
client.on('error', err => console.error(err));

app.use(express.static('./Public'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

app.get('/', (request, response) => response.sendFile('./Public/index.html'));

loadDB();



function loadUsers() {
    fs.readFile('raw-user-data.json', (err, fd) => {
        JSON.parse(fd.toString()).forEach(user => {
            client.query(
                `INSERT INTO users(id, username, password, "email", address) VALUES ($1, $2, $3, $4, $5)`
                [user.id, user.username, user.password, user.email, user.address]
            )
            .catch(console.error);
        })
    })
}

function loadPets() {
    fs.readFile('raw-user-data.json', (err, fd) => {
        JSON.parse(fd.toString()).forEach(pet => {
            client.query(
                `INSERT INTO pets(id, owner_id, pet_name, species, breed, sex, color, size, interest, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
                [pet.id, pet.owner_id, pet.pet_name, pet.species, pet.breed, pet.sex, pet.color, pet.size, pet.interest, pet.description]
            )
            .catch(console.error);
        })
    })
}

function loadDB() {
    client.query(`
        CREATE TABLE IF NOT EXISTS
        users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL,
            "email" UNIQUE NOT NULL,
            address NOT NULL
        );`
    )
    .then(loadUsers)
    .catch(console.error);

    client.query(`
        CREATE TABLE IF NOT EXISTS
        pets (
            id SERIAL PRIMARY KEY,
            owner_id INTEGER,
            pet_name TEXT,
            species TEXT,
            breed TEXT,
            sex TEXT,
            color TEXT,
            size TEXT,
            interest TEXT,
            description TEXT
        );`
    )
    .then(loadPets)
    .catch(console.error);
}