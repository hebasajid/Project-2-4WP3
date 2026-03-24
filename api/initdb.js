const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite'); //creating a new database file named database.sqlite in the current directory

db.serialize(() => {
  // Drop table if it exists
  db.run("DROP TABLE IF EXISTS expenses");

  //creating a table for expenses
  db.run(`CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Item_date TEXT,
    Item_amount REAL,
    Item_name TEXT,
    Item_category TEXT
  )`);

  //inserting initial records 
  const stmt = db.prepare("INSERT INTO expenses (Item_date, Item_amount, Item_name, Item_category) VALUES (?, ?, ?, ?)");
  stmt.run("2026-03-01", 50.00, "Groceries", "Food");
  stmt.run("2026-03-05", 15.50, "Movie Ticket", "Entertainment");
  stmt.finalize();

  console.log("Database initialized with seed records.");
});
db.close();