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
  const regex = /^([a-zA-Zá-úÁ-Ú-_']+\s?\b){2,}$/;
  console.log(regex.test(name));
  return regex.test(name);
}

function validateEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  console.log(regex.test(email));
  return regex.test(email);
}

function validateRut(rut) {
  const f = (T) => {
    let M = 0;
    let S = 1;
    for (; T; T = Math.floor(T / 10)) {
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    }
    return S ? S - 1 : 'k';
  }
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
    return false;
  }
  const tmp = rut.split('-');
  let digv = tmp[1];
  const num = tmp[0];
  if (digv === 'K') digv = 'k';
  console.log(f(num) == digv);
  return (f(num) == digv);
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
