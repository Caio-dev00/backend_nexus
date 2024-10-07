const jwt = require('jsonwebtoken')
const getToken = require('./get-token.js')

const verifyToken = (req, res, next) => {

  if (req.path === '/conversion/convert') {
    return next(); 
  }

  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'Acesso negado' })
  }

  const token = getToken(req)

  if(!token) {
    return res.status(401).json({ message: 'Acesso negado' })
  }

  try {

    const verified = jwt.verify(token, "nexus#%?")
    req.user = verified
    next()

  }catch(err) {
    return res.status(400).json({ message: "Token Invalido!" })
  }
}

module.exports = verifyToken