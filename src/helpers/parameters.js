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

function validateName(req, res, next) {
  const regex = /^([a-zA-Zá-úÁ-Ú-_']+\s?\b){2,}$/;
  if (regex.test(req.body.name)) {
    next();
  } else {
    res.status(422).json({ message: 'Nombre inválido (requiere nombre y apellido)' })
  }
}

function validateEmail(req, res, next) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(req.body.mail)) {
    next();
  } else {
    res.status(422).json({ message: 'Correo inválido' })
  }
}

function validateRut(req, res, next) {
  const f = (T) => {
    let M = 0;
    let S = 1;
    for (; T; T = Math.floor(T / 10)) {
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    }
    return S ? S - 1 : 'k';
  };
  if (/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(req.body.rut)) {
    const tmp = req.body.rut.split('-');
    let digv = tmp[1];
    const num = tmp[0];
    if (digv === 'K') digv = 'k';
    if (f(num) == digv) {
      next();
    } else {
      res.status(422).json({ message: 'RUT inválido' });
    }
  } else {
    res.status(422).json({ message: 'RUT inválido' });
  }
}

function validatePhone(req, res, next) {
  const regex = /^\+569\d{8}$/;
  if (regex.test(req.body.phone)) {
    next();
  } else {
    res.status(422).json({ message: 'Teléfono inválido. (Incluir +569 y 8 dígitos)' });
  }
}

module.exports = {
  permitParams,
  permitHeaders,
  validateName,
  validateEmail,
  validateRut,
  validatePhone,
};
