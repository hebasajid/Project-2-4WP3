const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// connecting to the SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the SQLite database.');
});


//starting server at port 3000 
app.listen(3000, () => {
    console.log("RESTful API listening on port 3000");
    console.log("Accessible at http://localhost:3000/api");
});