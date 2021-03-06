const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');

const checkFileMd = (nameFile) => {
  const extMd = /\.(md|mkdn|mdown|markdown?)$/i;
  return extMd.test(path.extname(nameFile));
}

const readFileMd = (arrFiles) => {
  const links = [];
  arrFiles.forEach(file => {
    const dataFile = fs.readFileSync(file, 'utf8');
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      links.push({
        href: href,
        text: text,
        file: file
      });
    };
    marked(dataFile, { renderer });
  })
  return links;
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
    const files = fs.readdirSync(routeArchOrFile);
    files.forEach(file => {
      arrRoute = arrRoute.concat(travelArchFile(path.join(`${routeArchOrFile}`, `${file}`)));
    });
  }
  return arrRoute;
}

const linksUnique = (arrLinks) => [...new Set(arrLinks.map(link => link.href))];

const linksBroken = (arrLinksValidate) => arrLinksValidate.filter(link => link.status >= 400);

const validateStats = (arrObjLinks) => {
  const arrLinks = arrObjLinks.map(link => link.href);
  const promises = arrLinks.map(link => fetch(link));
  return Promise.all(promises)
    .then(response => {
      const linksValidate = arrObjLinks.map((objLinkData, statsLink) => {
        objLinkData.status = response[statsLink].status;
        objLinkData.statusText = response[statsLink].statusText;
        return objLinkData;
      });
      return linksValidate;
    })
}

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(route)) {
      const arrRouteMd = travelArchFile(path.resolve(route));
      const arrLinksMd = readFileMd(arrRouteMd);
      if (arrLinksMd.length === 0) {
        resolve('Tu archivo o carpeta no tiene links');
      }
      if (options.validate && options.stats) {
        validateStats(arrLinksMd)
          .then(response => resolve({ total: response.length, unique: linksUnique(response).length, broken: linksBroken(response).length }));
      } else if (options.validate) {
        validateStats(arrLinksMd)
          .then(response => resolve(response));
      } else if (options.stats) {
        resolve({ total: arrLinksMd.length, unique: linksUnique(arrLinksMd).length });
      } else {
        resolve(arrLinksMd);
      }
    } else {
      resolve(`La ruta colocada no se encuentra ${path.resolve(route)}`);
    }
  })
}

module.exports = mdLinks;
