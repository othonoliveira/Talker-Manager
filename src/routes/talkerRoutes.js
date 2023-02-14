const express = require('express');
const fs = require('fs').promises;
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkRateValidation,
} = require('../validations/talkerValidations');

const path = 'src/talker.json';

const talkerRoute = express.Router();

talkerRoute.get('/', async (req, res) => {
  const talkerData = await fs.readFile(path, 'utf-8');
  return res.status(200).json(JSON.parse(talkerData));
});

talkerRoute.get('/:id', async (req, res) => {
  const talkerData = await fs.readFile(path, 'utf-8');
  const data = await JSON.parse(talkerData);
  const { id } = req.params;
  const matchedTalker = data.find((talker) => +talker.id === +id);
  if (matchedTalker) return res.status(200).json(matchedTalker);
  res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

talkerRoute.post('/', async (req, res) => {
  const { name, age, talk } = req.body;
  let talkers = await fs.readFile(path, 'utf-8');
  talkers = JSON.parse(talkers);
  const id = talkers.length + 1;
  const newTalker = { name, age, talk, id };
  await fs.writeFile(path, JSON.stringify([...talkers, newTalker], null, 2));
  if (tokenValidation(req) != null) return res.status(401).send(tokenValidation(req));
  if (await nameValidation(req) != null) return res.status(400).send(await nameValidation(req));
  if (await ageValidation(req) != null) return res.status(400).send(await ageValidation(req));
  if (talkRateValidation(req) != null) return res.status(400).send(talkRateValidation(req));
  
  return res.status(201).send(newTalker);
});

talkerRoute.put('/:id', async (req, res) => {
  if (tokenValidation(req) != null) return res.status(401).send(tokenValidation(req));
  if (await nameValidation(req) != null) return res.status(400).send(await nameValidation(req));
  if (await ageValidation(req) != null) return res.status(400).send(await ageValidation(req));
  if (talkRateValidation(req) != null) return res.status(400).send(talkRateValidation(req));
  const { id } = req.params;
  const { name, age, talk } = req.body;
  let talkers = await fs.readFile(path, 'utf-8');
  talkers = JSON.parse(talkers);
  const index = talkers.findIndex((talker) => +talker.id === +id);
  const updatedTalker = { id: +id, name, age, talk };
  talkers[index] = updatedTalker;
  await fs.writeFile(path, JSON.stringify([...talkers], null, 2));
  return res.status(200).send(talkers[index]);
});

module.exports = talkerRoute;