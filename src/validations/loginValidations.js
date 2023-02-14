const emailValdation = (req) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const { email, password } = req.body;
  if (!email || !password) {
    return { message: `O campo "${email ? 'password' : 'email'}" é obrigatório` };
  }
  if (!emailRegex.test(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return null;
};

const passwordValidation = (req) => {
  const { password } = req.body;
  if (password.length < 6) return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  return null;
};

module.exports = { passwordValidation, emailValdation };