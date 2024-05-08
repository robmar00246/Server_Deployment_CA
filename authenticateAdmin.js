const fs = require('fs');
const auth = require('basic-auth');

const users = JSON.parse(fs.readFileSync('./users.json'));

const authenticateAdmin = (req, res, next) => {
  try {
    const user = auth(req);

    if (!user || user.name !== users.admin.login || user.pass !== users.admin.password) {
      throw new Error('Unauthorized');
    }

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateAdmin;