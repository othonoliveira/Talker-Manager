const tokenValidation = (req) => {
  const { authorization } = req.headers;

  if (!('authorization' in req.headers)) {
    return { message: 'Token não encontrado' };
  }
  if (typeof authorization !== 'string' || authorization.length !== 16) {
    return { message: 'Token inválido' };
  }
  return null;
};

const nameValidation = async (req) => {
  const { name } = req.body;
  if (!name) {
    return { message: 'O campo "name" é obrigatório' };
  }
  if (name.length < 3) {
    return { message: 'O "name" deve ter pelo menos 3 caracteres' };
  }
  return null;
};

const ageValidation = async (req) => {
  const { age } = req.body;
  switch (true) {
    case !age:
      return { message: 'O campo "age" é obrigatório' };
    case typeof age !== 'number':
      return { message: 'O campo "age" deve ser do tipo "number"' };
    case !Number.isInteger(age):
      return { message: 'O campo "age" deve ser um "number" do tipo inteiro' };
    case age < 18:
      return { message: 'A pessoa palestrante deve ser maior de idade' };
    default:
      return null;
  }
};

const talkValidation = (req) => {
  const { talk } = req.body;
  if (!talk) {
    return { message: 'O campo "talk" é obrigatório' };
  }
  const { watchedAt } = talk;
  if (!watchedAt) {
    return { message: 'O campo "watchedAt" é obrigatório' };
  }
  const dateRegex = /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
  if (!dateRegex.test(watchedAt)) {
    return { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  }
  return null;
};

const rateValidation = (req) => {
  const { talk } = req.body;
  const { rate } = talk;
  if (!('rate' in talk)) { 
    return { message: 'O campo "rate" é obrigatório' }; 
  }
  if (!Number.isInteger(rate) || rate > 5 || rate < 1) {
    return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  }
  return null;
};

const talkRateValidation = (req) => {
  if (talkValidation(req) != null) return talkValidation(req);
  if (rateValidation(req) != null) return rateValidation(req);
  return null;
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkRateValidation,
};