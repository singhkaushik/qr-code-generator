require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { createCanvas } = require("canvas");
const QRCode = require("qrcode");
const fs = require("fs");
const { query } = require("./db.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Create the database and tables if they don't exist
async function initializeDatabase() {
  try {
    // Create the database if it doesn't exist
    await query("CREATE DATABASE IF NOT EXISTS qrcode");

    // Use the database
    await query("USE qrcode");

    // Create the customer table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS customer (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL
      )
    `);

    // Create the customer_qr_codes table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS customer_qr_codes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        qr_code_path VARCHAR(255) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES customer(id)
      )
    `);

    console.log("Database and tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Initialize the database on server start
initializeDatabase();

app.get("/generateAllQRCodes", async (req, res) => {
  try {
    // Retrieve customers who don't have a corresponding QR code
    const usersWithoutQRCode = await query(`
      SELECT *
      FROM customer
      WHERE id NOT IN (
        SELECT user_id FROM customer_qr_codes
      )
    `);

    for (const user of usersWithoutQRCode) {
      const userId = user.id;
      const userData = user;
      const outputPath = `./qr/qr_code_${userId}.png`;

      await generateUniqueQRCode(JSON.stringify(userData), outputPath);

      // Insert the generated QR code path into the database
      await query(
        "INSERT INTO customer_qr_codes (user_id, qr_code_path) VALUES (?, ?)",
        [userId, outputPath]
      );
    }

    res.send({ message: "QR codes generated successfully" });
  } catch (error) {
    console.error("Error generating QR codes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function generateUniqueQRCode(userData, outputPath) {
  try {
    const canvas = createCanvas(300, 300);
    const ctx = canvas.getContext("2d");

    await QRCode.toCanvas(canvas, userData);

    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outputPath, buffer);
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error; // Propagate the error to the caller
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
