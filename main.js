const travelArchFile= require('./index.js')
const path = require('path');

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    const links = [];
    travelArchFile(path.resolve(route), links);
    setTimeout(() => {
      if (options.stats && options.validate) {
        const linksUnique = [...new Set(links.map(link => link.href))];
      }
      resolve(links)
      // console.log(options)
      // reject('El archivo no tiene links')

    }, 500);
  })
}

module.exports = mdLinks;
