const sqlite3 = require("sqlite3").verbose();
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


//GET ROUTE: gets all expenses from the db route: /api

app.get('/api', (req, res) => {
    console.log("GET EXPENSES REQUEST RECEIVED");
    const sql = "SELECT * FROM expenses";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows); //returning the arrays of expenses as JSON response
        }
    });
});


//POST ROUTE: adds a new expense to the db route: /api
app.post('/api', (req, res) => {
    console.log("POST EXPENSE REQUEST RECEIVED");
    const { Item_date, Item_amount, Item_name, Item_category } = req.body;  
    const sql = `INSERT INTO expenses (Item_date, Item_amount, Item_name, Item_category) 
                 VALUES (?, ?, ?, ?)`;
    const params = [Item_date, Item_amount, Item_name, Item_category];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            status: `New record created with $id=${this.lastID}` //ensuring response includes the ID of the newly created record for client reference
        });
    });
});

//starting server at port 3000 
app.listen(3000, () => {
    console.log("RESTful API listening on port 3000");
    console.log("Accessible at http://localhost:3000/api");
});