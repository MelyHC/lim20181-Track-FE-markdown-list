const fs = require('fs');
const path = require('path');
const marked = require('marked')
const fetch = require('node-fetch');

const checkFileMd = (nameFile) => {
  const extMd = /\.(md|mkdn|mdown|markdown?)$/i;
  return extMd.test(path.extname(nameFile))
}

const readFileMd = (arrFiles) => {
  const links = []
  arrFiles.forEach(file => {
    const dataFile = fs.readFileSync(file, 'utf8');
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
      links.push({
        href: href,
        text: text,
        file: file
      })
    }
    marked(dataFile, { renderer });
  })
  return links
}

const travelArchFile = (routeArchOrFile) => {
  let arrayDeRutas = [];
  const statFileArch = fs.statSync(routeArchOrFile)
  if (statFileArch.isFile()) {
    const fileMd = checkFileMd(routeArchOrFile);
    if (fileMd) {
      arrayDeRutas.push(routeArchOrFile);
    }
  } else if (statFileArch.isDirectory()) {
    const files = fs.readdirSync(routeArchOrFile)
    files.forEach(file => {
      arrayDeRutas = arrayDeRutas.concat(travelArchFile(path.join(`${routeArchOrFile}`, `${file}`)));
    });
  }
  return arrayDeRutas;
}

const linksUnique = (arrLinks) => {
  return [...new Set(arrLinks.map(link => link.href))];
}

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(route)) {
      let broken = 0;
      const arrRouteMd = travelArchFile(path.resolve(route));
      const arrLinksMd = readFileMd(arrRouteMd);
      if (arrLinksMd.length === 0) {
        resolve('Tu archivo o carpeta no tiene links');
      }
      if (options.validate && options.stats) {
        const uniqueLinks = linksUnique(arrLinksMd)
        const promises = uniqueLinks.map(link => fetch(link))
        return Promise.all(promises)
          .then(response => {
            const arrlinks = response.map(linkStatus => linkStatus.status)
            return `Total: ${arrLinksMd.length} \nUnique: ${uniqueLinks.length} \nBroker: ${arrlinks.length} `
          })
      } else if (options.validate) {
        resolve('validate')
      } else if (options.stats) {
        resolve(`Total: ${arrLinksMd.length} \nUnique: ${linksUnique(arrLinksMd).length}`)
      } else {
        resolve(arrLinksMd);
      }
    } else {
      resolve(`La ruta colocada no se encuentra ${path.resolve(route)}`)
    }
  })
}

module.exports = mdLinks;
