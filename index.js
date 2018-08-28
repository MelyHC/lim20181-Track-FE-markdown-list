const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const marked = require('marked')

const checkFileMd = (nameFile) => {
  const extMd = /\.(md|mkdn|mdown|markdown?)$/i;
  return extMd.test(path.extname(nameFile))
}

const readFileMd = (file, links) => {
  const dataFile = fs.readFileSync(file, 'utf8');
  const renderer = new marked.Renderer()
  renderer.link = (href, title, text) => {
    links.push({
      href: href,
      text: text,
      file: file
    })
  }
  marked(dataFile, { renderer: renderer })
  return links
}

const travelArchFile = (routeArchOrFile, links) => {
  const statFileArch = fs.statSync(routeArchOrFile)
  if (statFileArch.isFile()) {
    const fileMd = checkFileMd(routeArchOrFile);
    if (fileMd) {
      return readFileMd(routeArchOrFile, links);
    }
  } else if (stats.isDirectory()) {
    const files = fs.readdirSync(routeArchOrFile)
    files.forEach(file => {
      travelArchFile(path.join(`${routeArchOrFile}`, `${file}`), links);
    });
  }
}

module.exports = travelArchFile;
