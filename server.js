const pg = require('pg');
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

