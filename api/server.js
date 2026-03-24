const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");

const app = express();

app.use(express.json());

async function startup()
{
  db = await sqlite.open({
    filename: 'api.db',
    driver: sqlite3.Database
  });
  
  const server = app.listen(3000, function() {
    console.log("RESTful API listening on port 3000");
  });
}