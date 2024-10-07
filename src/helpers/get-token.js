const getToken = (req) => {
  const authHeader = req.headers.authorization;
  
  // Verifica se o cabeçalho de autorização existe antes de tentar acessá-lo
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token;
  }
  
  return null; // Retorna null se não houver token
}

module.exports = getToken;
