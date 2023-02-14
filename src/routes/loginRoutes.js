const express = require('express');
const tokenGenerator = require('generate-token');

const loginRoutes = express.Router();

loginRoutes.post('/', async (req, res) => {
  const token = tokenGenerator.generate(16);
  return res.status(200).json({ token });
});

module.exports = loginRoutes;