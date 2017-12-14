const models = require('../models');
const XlsxPopulate = require('xlsx-populate');


async function excelGen(file) {
  let i = 2;
  let user;
  let opt;
  let cell;
  const workbook = await XlsxPopulate.fromFileAsync(file);
  const sheet = workbook.sheet('Ponderaciones');
  const data = await models.Ponderation.findAll();
  for (let j in data) {
    user = await data[j].getUser();
    opt = await data[j].getOpt();
    career = await models.Career.findOne( { where: {id: data[j].careerId } })
    // cell = await sheet.cell(`A${i}`)
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
    await sheet.cell(`N${i}`).value(data[j].createdAt.toString());
    i += 1;
  }
  return workbook.toFileAsync('./src/public/ponderaciones.xlsx');
}

module.exports = excelGen;
