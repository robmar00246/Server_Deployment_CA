const auth = require('basic-auth');
const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./users.json'));

const authenticateAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new Error('Unauthorized');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== users.admin.login || password !== users.admin.password) {
      throw new Error('Unauthorized');
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateAdmin;