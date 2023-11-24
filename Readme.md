QR Code Generator
Overview
This project is a QR code generator that creates unique QR codes for customers stored in a MySQL database. It ensures that QR codes are generated only for customers who don't already have one, avoiding duplicates.

Features
Generates QR codes for customers in the database.
Avoids duplicate QR codes for existing customers.
Simple and easy-to-use interface.
Prerequisites
Before running the application, ensure you have the following installed:

Node.js
MySQL server
Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/singhkaushik/qr-code-generator.git
Install dependencies:

bash
Copy code
cd qr-code-generator
npm install
Configure the environment:

Create a .env file in the project root with the following content:

env
Copy code
host: process.env.DB_HOST,
user: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE,
PORT=3001
Replace the placeholders with your actual database connection details.

Initialize the database:

Run the server to initialize the database and tables:

bash
Copy code
npm start
Generate QR codes:

Open the frontend in your web browser:

bash
Copy code
cd client
npm start
Visit http://localhost:3000 to generate QR codes.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Node.js
MySQL
Express
React
qrcode
canvas
axios