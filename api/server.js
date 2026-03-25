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


//1. GET ROUTE: gets all expenses from the db route: /api

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

//2. GET ROUTE: gets ONE expense from the db route based on id: /api/:id
app.get('/api/:id', (req, res) => {
    console.log("GET EXPENSE BY ID REQUEST RECEIVED");
    const { id } = req.params; //getting id of expense from req. params
    const sql = "SELECT * FROM expenses WHERE id = ?"; //sql query
    db.get(sql, [id], (err, row) => { //executing query with specific id
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
        } else {
            res.json(row); //returning record as json reponse
        }
    });
});


//3. POST ROUTE: adds a new expense to the db route: /api
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
       res.json({ status: "New record created with $id=" + this.lastID });
    });
});

//4. DELETE ROUTE: deletes ONE expense from the db route based on id: /api/:id

app.delete('/api/:id', (req, res) => {
    console.log("DELETE EXPENSE REQUEST RECEIVED");
    const { id } = req.params; //getting the ID of the expense to be deleted from the request params
    const sql = "DELETE FROM expenses WHERE id = ?";
    db.run(sql, id, function (err) {  //executing delete request w specific ID
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ status: "Record id=" + id + " deleted" });
    });
});

//5. DELETE ROUTE: deletes ALL expenses from the db route: /api
app.delete('/api', (req, res) => {
    console.log("DELETE ALL EXPENSES REQUEST RECEIVED");
    const sql = "DELETE FROM expenses";
    db.run(sql, function (err) {  //executing delete request to remove all records
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ status: "Collection deleted" });
    });
});


//6. PUT ROUTE: updates an existing expense in the db route based on id: /api/:id
app.put('/api/:id', (req, res) => {
    const { id } = req.params;
    const { Item_date, Item_amount, Item_name, Item_category } = req.body; //getting all fields of expense to update them
    const sql = `UPDATE expenses SET Item_date = ?, Item_amount = ?, Item_name = ?, Item_category = ? WHERE id = ?`; //using sql statement
    const params = [Item_date, Item_amount, Item_name, Item_category, id]; //

    db.run(sql, params, function (err) { //running update request w specific id and new vals
        if (err) return res.status(400).json({ error: err.message });
        res.json({ status: "Record id=" + id + " updated" }); //response of success
    });
});

//7. PUT ROUTE: updates all expenses in the db route: /api
app.put('/api', (req, res) => {
    const items = req.body; //expects array of json objs.
    db.serialize(() => {
        db.run("DELETE FROM expenses");
        const stmt = db.prepare(`INSERT INTO expenses (Item_date, Item_amount, Item_name, Item_category) VALUES (?, ?, ?, ?)`);
        items.forEach(item => {
            stmt.run(item.Item_date, item.Item_amount, item.Item_name, item.Item_category); //inserting each item from  array into  db, replacing all existing records
        });
        stmt.finalize();
        res.json({ status: "Collection replaced" });
    });
});



//starting server at port 3000 
app.listen(3000, () => {
    console.log("RESTful API listening on port 3000");
    console.log("http://localhost:3000/api");
});