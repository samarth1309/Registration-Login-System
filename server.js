const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sama9694",
    database: "formdb"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        return;
    }
    console.log("✅ MySQL Connected Successfully!");
});


app.post("/register", (req, res) => {
    const { name, email, country, phone, password } = req.body;

    const sql = "INSERT INTO users (name, email, country, phone, password) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [name, email, country, phone, password], (err, result) => {
        if (err) {
            console.log("REAL ERROR:", err);   // 🔥 IMPORTANT
            return res.status(500).json({ message: err.message });
        }

        res.status(201).json({ message: "User Registered Successfully!" });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.log("REAL ERROR:", err);   // 🔥 IMPORTANT
            return res.status(500).json({ message: err.message });
        }
        if (results.length > 0) {
            res.status(200).json({
                success: true,
                message: "Login successful.",
                user: results[0].id,
                userName: results[0].name
            });
        }else{
            res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});