const models = require('../models');
const XlsxPopulate = require('xlsx-populate');

const { Op } = models.Sequelize;


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

async function excelUcen(file, outfile) {
  let i = 2;
  let user;
  let opt;
  let university;
  const workbook = await XlsxPopulate.fromFileAsync(file);
  const sheet = workbook.sheet('Ponderaciones');
  const data = await models.Ponderation.findAll({ include: { all: true }, where: { universityId: [27, 25, 30, 14, 33] } });
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
    // await sheet.cell(`P${i}`).value(career.ucenId);
    i += 1;
  }
  return workbook.toFileAsync(outfile);
}

async function excelUcen2(file, outfile, ugm=false) {
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


module.exports = { excelGen, excelUcen, excelUcen2 };
