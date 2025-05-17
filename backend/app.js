const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/grid", (req, res) => {
	try {
		const rows = db.prepare("SELECT * FROM grid").all();
		res.status(200).json({ grid: rows });
	} catch (error) {
		res.status(500).json({ message: "Error fetching grid data", error });
	}
});

app.post("/setGridColor", (req, res) => {
	const { x, y, color } = req.body;

	if (!color) {
		return res.status(400).json({ message: "Invalid color value" });
	}

	const row = db.prepare("SELECT * FROM grid WHERE x = ? AND y = ?").get(x, y);

	if (!row) {
		return res.status(400).json({ message: "Invalid coordinates" });
	}

	db.prepare("UPDATE grid SET color = ? WHERE x = ? AND y = ?").run(
		color,
		x,
		y,
	);

	const updatedGrid = db.prepare("SELECT * FROM grid").all();
	res.status(200).json({ message: "Grid color updated", grid: updatedGrid });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});