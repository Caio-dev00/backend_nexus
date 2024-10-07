const jwt = require('jsonwebtoken');
const getToken = require('./get-token.js');

const verifyToken = (req, res, next) => {
  // Para a rota /convert, não vamos forçar o token
  if (req.path === '/convert') {
    const token = getToken(req);
    
    // Se o token for fornecido, tenta verificar
    if (token) {
      try {
        const verified = jwt.verify(token, "nexus#%?");
        req.user = verified; // Associa o usuário à requisição se o token for válido
      } catch (err) {
        return res.status(400).json({ message: "Token inválido!" });
      }
    }

    // Prossegue sem forçar a existência do token
    return next();
  }

  // Para todas as outras rotas, o token é obrigatório
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  try {
    const verified = jwt.verify(token, "nexus#%?");
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Token inválido!" });
  }
};

module.exports = verifyToken;
