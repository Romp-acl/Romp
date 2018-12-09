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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./Public'));
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

app.get('/', (request, response) => response.sendFile('./Public/index.html'));

app.get('/userData', (request, response) => {
    client.query(`
    SELECT * FROM users
    JOIN pets
    ON users.id = pets.owner_id;
    `)
    .then(result => response.send(result.rows))
    .catch(console.error);
});

app.get('/msgBoardData', (request, response) => {
    client.query(`
    SELECT comments.*, users.username 
    FROM comments
    JOIN users ON comments.commenter_id = users.id;
    `)
    .then(result => response.send(result.rows))
    .catch(console.error);
})

app.post('/userComment', (request, response) => {
    console.log(request.body);
    client.query(
        `INSERT INTO comments(commenter_id, username, comment_text, profile_id)
        VALUES($1, $2, $3, $4)`,
        [
            request.body.commenter_id,
            request.body.username,
            request.body.comment_text,
            request.body.profile_id
        ]
    )
    .then(() => response.send('Insert complete'))
    .catch(console.error);
})

app.post('/regForm', (request, response) => {
    client.query(
        `INSERT INTO users(username, password, email, address) VALUES($1, $2, $3, $4) 
        ON CONFLICT DO NOTHING
        RETURNING id`,
        [request.body.username, request.body.password, request.body.email, request.body.address]
    )
    .then((result) => {
        console.log(JSON.stringify(request.body));
        client.query(
        `INSERT INTO
        pets(owner_id, imgurl, breed, sex, name, age, color, size, temperment, interests, description)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `,
        [
            result.rows[0].id,
            request.body.petObj.imgUrl,
            request.body.petObj.breed,
            request.body.petObj.sex,
            request.body.petObj.name,
            request.body.petObj.age,
            request.body.petObj.color,
            request.body.petObj.size,
            request.body.petObj.temperment,
            request.body.petObj.interests,
            request.body.petObj.about
        ]
        )
    })
    .then(() => response.send('Insert complete'))
    .catch(console.error);
})

loadDB();

function loadComments() {
    client.query('SELECT COUNT(*) FROM comments')
    .then(result => {
        if(!parseInt(result.rows[0].count)) {
            fs.readFile('raw-comments-data.json', (err, fd) => {
                JSON.parse(fd.toString()).forEach(comment => {
                    client.query(
                        `INSERT INTO comments(id, commenter_id, username, comment_text, profile_id) VALUES ($1, $2, $3, $4, $5)`,
                        [comment.id, comment.commenter_id, comment.username, comment.comment_text, comment.profile_id]
                    )
                    .catch(console.error);
                })
            })
            client.query('ALTER SEQUENCE comments_id_seq RESTART WITH 100')
        }
    })
}

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
            client.query('ALTER SEQUENCE users_id_seq RESTART WITH 100') 
        }
    })
}

function loadPets() {
    client.query('SELECT COUNT(*) FROM pets')
    .then(result => {
        if(!parseInt(result.rows[0].count)) {
            fs.readFile('raw-user-data.json', (err, fd) => {
                JSON.parse(fd.toString()).forEach(pet => {
                    client.query(
                    `INSERT INTO pets(id, owner_id, imgUrl, name, age, breed, sex, color, size, interests, temperment, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                    [pet.id, pet.id, pet.imgUrl, pet.name, pet.age, pet.breed, pet.sex, pet.color, pet.size, pet.temperment, pet.interests,  pet.description]
                    )
                    .catch(console.error);
                })
            })
            client.query('ALTER SEQUENCE pets_id_seq RESTART WITH 100')
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
            address VARCHAR(255) 
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
            temperment VARCHAR(255),
            interests VARCHAR(255),
            description VARCHAR(255)
        );`
    )
    .then(loadPets)
    .catch(console.error);

    client.query(`
        CREATE TABLE IF NOT EXISTS
        comments (
            id SERIAL PRIMARY KEY,
            commenter_id INTEGER,
            username VARCHAR(30),
            comment_text VARCHAR(140),
            profile_id INTEGER
        );`
    )
    .then(loadComments)
    .catch(console.error);
}