const models = require('../models');
const XlsxPopulate = require('xlsx-populate');
const Papa = require('papaparse');
const fs = require('fs');


async function excelGen(file,outfile, ugm=false) {
  let i = 2;
  let user;
  let opt;
  let university;
  const workbook = await XlsxPopulate.fromFileAsync(file);
  const sheet = workbook.sheet('Ponderaciones');
  const data = await models.Ponderation.findAll({ include: { all: true } });
  for (let j in data) {
    user = data[j].User;
    opt = data[j].Opt;
    career = data[j].Career;
    university = data[j].University;
    (data[j].createdAt.setHours(data[j].createdAt.getHours() - 3));

    await sheet.cell(`A${i}`).value(user.name);
    await sheet.cell(`B${i}`).value(user.mail);
    await sheet.cell(`C${i}`).value(user.rut);
    await sheet.cell(`D${i}`).value(user.regionId);
    await sheet.cell(`E${i}`).value(user.phone);
    await sheet.cell(`F${i}`).value(data[j].NEM);
    await sheet.cell(`G${i}`).value(data[j].ranking);
    await sheet.cell(`H${i}`).value(data[j].math);
    await sheet.cell(`I${i}`).value(data[j].language);
    if (opt.id === 2) {
      await sheet.cell(`J${i}`).value(data[j].history);
    } else {
      await sheet.cell(`J${i}`).value(data[j].science);
    }
    await sheet.cell(`K${i}`).value(opt.title);
    await sheet.cell(`L${i}`).value(data[j].value);
    await sheet.cell(`M${i}`).value(career.title);
    await sheet.cell(`N${i}`).value(university.title);
    await sheet.cell(`O${i}`).value(data[j].createdAt.toString());
    if (ugm){
      await sheet.cell(`P${i}`).value(career.UgmId);
    }
    i += 1;
  }
  return workbook.toFileAsync(outfile);
}

async function csvGen(outfile, ugm=false) {
  const data = await models.Ponderation.findAll({ include: { all: true } });
  const filtered = data.map((element) => {
    (element.createdAt.setHours(element.createdAt.getHours() - 3));
    const user = element.User;
    const opt = element.Opt;
    const career = element.Career;
    const university = element.University;
    const obj = {
      nombre: user.name,
      mail: user.mail,
      rut: user.rut,
      Telefono: user.phone,
      NEM: element.NEM,
      ranking: element.ranking,
      matematicas: element.math,
      lenguaje: element.language,
      Optativa: opt.title,
      Puntaje: element.value,
      Carrera: career.title,
      Universidad: university.title,
      Hora: element.createdAt.toString(),
    };
    if (ugm) {
      obj.UgmId = career.UgmId;
    } else {
      obj.UgmId = '';
    }
    if (opt.id === 2) {
      obj.ptjeOptativa = element.history;
    } else {
      obj.ptjeOptativa = element.science;
    }
    return obj;
  });
  fs.writeFileSync(outfile, Papa.unparse(filtered));
}


module.exports = { excelGen, csvGen };
