const Database = require("better-sqlite3");
const db = new Database("./grid.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS grid (
    x INT,
    y INT,
    color TEXT
  )
`);

const rowCount = db.prepare("SELECT COUNT(*) AS count FROM grid").get().count;

if (rowCount === 0) {
	const grid = [];
	for (let x = 0; x < 20; x++) {
		for (let y = 0; y < 20; y++) {
			grid.push({ x, y, color: "white" });
		}
	}

	const insertStatement = db.prepare(
		"INSERT INTO grid (x, y, color) VALUES (?, ?, ?)",
	);
	const insertTransaction = db.transaction((rows) => {
		for (const row of rows) {
			insertStatement.run(row.x, row.y, row.color);
		}
	});

	insertTransaction(grid);
}

module.exports = db;
