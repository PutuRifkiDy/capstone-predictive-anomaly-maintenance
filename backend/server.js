const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// list end points
app.get('/', (request, response) => {
  response.json({ Welcome: 'Testing' })
});

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



