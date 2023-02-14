const express = require('express');
const fs = require('fs').promises;

const talkerRoute = express.Router();

talkerRoute.get('/', async (req, res) => {
  const talkerData = await fs.readFile('src/talker.json', 'utf-8');
  return res.status(200).json(JSON.parse(talkerData));
});

talkerRoute.get('/:id', async (req, res) => {
  const talkerData = await fs.readFile('src/talker.json', 'utf-8');
  const data = await JSON.parse(talkerData);
  const { id } = req.params;
  const matchedTalker = data.find((talker) => +talker.id === +id);
  if (matchedTalker) return res.status(200).json(matchedTalker);
  res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRoute;