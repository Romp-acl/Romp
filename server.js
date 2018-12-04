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
app.get('/petData', (request, response) => {
    client.query(`
        SELECT pets.*, users.username, users.address 
        FROM pets
        JOIN users ON users.id = pets.owner_id;
    `)
    .then(result => response.send(result.rows))
    .catch(console.error);
});


loadDB();

function loadUsers() {
    client.query('SELECT COUNT(*) FROM users')
    .then(result => {
        if(!parseInt(result.rows[0].count)) {
            fs.readFile('raw-user-data.json', (err, fd) => {
                JSON.parse(fd.toString()).forEach(user => {
                    client.query(
                        `INSERT INTO users(id, username, password, email, address) VALUES ($1, $2, $3, $4, $5)`,
                        [user.id, user.username, user.password, user.email, user.address]
                    )
                    .catch(console.error);
                })
            })  
        }
    })
}

function loadPets() {
    client.query('SELECT COUNT(*) FROM pets')
    .then(result => {
        if(!parseInt(result.rows[0].count)) {
            fs.readFile('raw-pet-data.json', (err, fd) => {
                JSON.parse(fd.toString()).forEach(pet => {
                    client.query(
                    `INSERT INTO pets(id, owner_id, imgUrl, name, age, breed, sex, color, size, interest, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
                    [pet.id, pet.owner_id, pet.imgUrl, pet.name, pet.age, pet.breed, pet.sex, pet.color, pet.size, pet.interest, pet.description]
                    )
                    .catch(console.error);
                })
            })
        }
    })   
}

function loadDB() {
    client.query(`
        CREATE TABLE IF NOT EXISTS
        users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            address VARCHAR(255) NOT NULL
        );`
    )
    .then(loadUsers)
    .catch(console.error);

    client.query(`
        CREATE TABLE IF NOT EXISTS
        pets (
            id SERIAL PRIMARY KEY,
            owner_id INTEGER,
            imgUrl VARCHAR(255),
            name VARCHAR(255),
            age VARCHAR(255),
            breed VARCHAR(255),
            sex VARCHAR(255),
            color VARCHAR(255),
            size VARCHAR(255),
            interest VARCHAR(255),
            description VARCHAR(255)
        );`
    )
    .then(loadPets)
    .catch(console.error);
}