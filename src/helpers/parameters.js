const parameters = require('parameters-middleware');

// Parameters
function getMessage(missing) {
  return `Missing params: ${missing.join(', ')}`;
}

function permitParams(params) {
  const p = parameters(
    {
      body: ['name', 'mail',
        'password', 'rut', 'phone', 'city'],
    },
    { message: getMessage },
    { statusCode: 400 }
  );
  return p;
}

module.exports = { permitParams };
