const travelArchFile = require('./index.js')
const path = require('path');

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    const links = [];
    
    const arrlinksMd = travelArchFile(path.resolve(route), links);
    resolve(arrlinksMd)
    
    
    // setTimeout(() => {
    // if (options.stats && options.validate) {
    //   const linksUnique = [...new Set(links.map(link => link.href))];
    // }
    
    // console.log(options)
    // reject('El archivo no tiene links')

    // }, 500);
  })
}

module.exports = mdLinks;
