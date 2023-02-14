const express = require('express');
const tokenGenerator = require('generate-token');
const {
  passwordValidation, emailValdation } = require('../validations/loginValidations');

const loginRoutes = express.Router();

loginRoutes.post('/', async (req, res) => {
  if (emailValdation(req) != null) return res.status(400).json(emailValdation(req));
  if (passwordValidation(req) != null) return res.status(400).json(passwordValidation(req));
  const token = tokenGenerator.generate(16);
  return res.status(200).json({ token });
});

module.exports = loginRoutes;