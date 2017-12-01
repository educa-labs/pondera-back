const parameters = require('parameters-middleware');

// Parameters
function getMessage(missing) {
  return { status: 'error', message: `Missing : ${missing.join(', ')}` };
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

function validateName(name) {
  const regex = /^([a-zA-Zá-úÁ-Ú-_']+\s?\b){2,}\Z/;
  console.log(regex.test(name));
  return regex.test(name);
}

function validateEmail(email) {
  return true;
}

function validateRut(rut) {
  return true;
}

function validatePhone(phone) {
  return true;
}

module.exports = {
  permitParams,
  permitHeaders,
  validateName,
  validateEmail,
  validateRut,
  validatePhone,
};
