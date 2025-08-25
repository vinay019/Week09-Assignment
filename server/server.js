import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
});

app.get("/", function (req, res) {
  res.send("Ouch! You've hit my roots!!!");
});

app.get("/feedback", async function (req, res) {
  const allFeedback = await db.query("SELECT * FROM feedback");
  res.json(allFeedback.rows);
});

app.post("/feedback", async function (req, res) {
  const { name, comment, rating } = req.body;

  if (!name || !comment || rating === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const result = await db.query(
    "INSERT INTO feedback (name, comment, rating) VALUES ($1, $2, $3) RETURNING *",
    [name, comment, rating]
  );

  res.json(result.rows[0]);
});

app.listen(PORT, function () {
  console.log(`Server running on ${PORT}`);
});
