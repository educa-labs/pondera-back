const parameters = require('parameters-middleware');

// Parameters
function getMessage(missing) {
  return {status: 'error', message: `Missing : ${missing.join(', ')}` }
  // return `Missing : ${missing.join(', ')}`;
}

function permitParams(params) {
  const p = parameters(
    {
      body: params,
    },
    { message: getMessage },
    { statusCode: 400 },
  );
  return p;
}

function permitHeaders(params) {
  const p = parameters(
    {
      headers: params,
    },
    { message: getMessage },
    { statusCode: 400 },
  );
  return p;
}

module.exports = { permitParams, permitHeaders };
