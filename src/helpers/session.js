const crypt = require('crypto');
const models = require('../models');

const encryptPasswd = data => (
  crypt.createHash('md5').update(data).digest('hex')
);

module.exports = {
  encryptPasswd,
};

