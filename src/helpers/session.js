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
        req.user = data;
        next();
      } else {
        res.status(401).json({ status: 'Unauthorized', message: 'Token invalido' });
      }
    });
}

function checkAdmin(req, res, next) {
  const token = req.get('Authorization');
  models.User.findOne({ where: { token } })
    .then((data) => {
      if (data && data.admin) {
        req.user = data;
        next();
      } else {
        res.status(401).json({ status: 'Unauthorized', message: 'Token invalido' });
      }
    });
}

function checkSuperadmin(req, res, next) {
  const token = req.get('Authorization');
  models.User.findOne({ where: { token } })
    .then((data) => {
      if (data && data.superadmin) {
        req.user = data;
        next();
      } else {
        res.status(401).json({ status: 'Unauthorized', message: 'Token invalido' });
      }
    });
}

module.exports = {
  encryptPasswd,
  checkSession,
  checkAdmin,
  checkSuperadmin,
};

