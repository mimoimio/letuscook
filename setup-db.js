const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./recipes.db');

// Create a table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY
  )`);
});

console.log("Database setup complete.");
db.close();
