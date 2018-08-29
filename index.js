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
  let arrRoute = [];
  const statFileArch = fs.statSync(routeArchOrFile)
  if (statFileArch.isFile()) {
    const fileMd = checkFileMd(routeArchOrFile);
    if (fileMd) {
      arrRoute.push(routeArchOrFile);
    }
  } else if (statFileArch.isDirectory()) {
    const files = fs.readdirSync(routeArchOrFile)
    files.forEach(file => {
      arrRoute = arrRoute.concat(travelArchFile(path.join(`${routeArchOrFile}`, `${file}`)));
    });
  }
  return arrRoute;
}

const linksUnique = (arrLinks) => {
  return [...new Set(arrLinks.map(link => link.href))];
}

const validateStats = (arrLinks) => {
  const uniqueLinks = linksUnique(arrLinks)
  const promises = uniqueLinks.map(link => fetch(link))
  return Promise.all(promises)
    .then(response => {
      const arrLinksValidate = response.map(linkStatus => linkStatus.status > 400)
      return `Total: ${arrLinks.length} \nUnique: ${uniqueLinks.length} \nBroker: ${arrLinksValidate.length} `
    })
}

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(route)) {
      let broken = 0;
      const arrRouteMd = travelArchFile(path.resolve(route));
      const arrLinksMd = readFileMd(arrRouteMd);
      // resolve(arrLinksMd)
      if (arrLinksMd.length === 0) {
        resolve('Tu archivo o carpeta no tiene links');
      }
      if (options.validate && options.stats) {
        validateStats(arrLinksMd)
          .then(response => response)
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
