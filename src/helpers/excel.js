const models = require('../models');

const baseCell = () => {
  const cell = {
    t: 's',
    v: '',
    r: '<t xml:space="">optativa</t>',
    h: '',
    w: '',
  };
  return cell;
};

function excelGen(ponderations, sheet) {
  let i = 2;
  let user;
  let opt;
  ponderations.forEach(async (ponderation) => {
    user = await ponderation.getUser();
    opt = await ponderation.getOpt();
    sheet[`A${i}`] = baseCell();
    console.log(sheet[`A${i}`]);
    sheet[`A${i}`].v = user.name;
    console.log(sheet[`A${i}`]);
    i += 1;
  });
  return sheet;
};

module.exports = excelGen;
