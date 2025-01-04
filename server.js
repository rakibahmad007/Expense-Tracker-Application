const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

let users = []; // This should be replaced with a database in a real application

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  res.status(201).send({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: 'Invalid password' });
  }
  res.status(200).send({ message: 'Login successful' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});