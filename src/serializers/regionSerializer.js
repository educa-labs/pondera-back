const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const regionSerializer = new JSONAPISerializer('region', { attributes: ['title'], pluralizeType: false });

module.exports = regionSerializer;
