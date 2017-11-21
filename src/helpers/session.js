const crypt = require('crypto');
const models = require('../models');
const params = require('../helpers/parameters');

const encryptPasswd = data => (
  crypt.createHash('md5').update(data).digest('hex')
);

function checkSession(req, res, next) {
  const token = req.get('Authorization');
  models.User.findOne({ where: { token } })
    .then((data) => {
      if (data) {
        next();
      } else {
        res.status(401).json({ status: 'Unauthorized', message: 'Token invalido' });
      }
    });
}

module.exports = {
  encryptPasswd,
  checkSession,
};

