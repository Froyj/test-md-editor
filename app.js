const mysql = require('mysql2');
const express = require('express');
const app = express();
const cors = require('cors');

const connection = mysql.createConnection({
  user: 'root',
  password: 'p4$$w0rd',
  database: 'mardown_test',
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/posts', async (req, res) => {
  try {
    const [md] = await connection
      .promise()
      .query('SELECT content FROM post WHERE id=1');
    res.json(md[0]);
  } catch (err) {
    console.error(err);
  }
});

app.post('/posts', async (req, res) => {
  try {
    const { content } = req.body;
    const { insertId } = await connection
      .promise()
      .query('INSERT INTO post SET ? ON DUPLICATE KEY UPDATE ?', [{ id: 1, content }, { id: 1, content }]);
    res.json({
      id: insertId,
      content,
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(4000, () => {
  console.log('Hello');
});
