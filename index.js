const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const marked = require('marked')

const checkFileMd = (nameFile) => {
  const extMd = /\.(md|mkdn|mdown|markdown?)$/i;
  return extMd.test(path.extname(nameFile))
}

const readFileMd = (file, links) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
      links.push({
        href: href,
        text: text,
        file: file
      })
    }
    marked(data, { renderer: renderer })
  })
}

const travelArchFile = (routeArchOrFile, links) => {
  const arrFilesMd = [];
  fs.stat(routeArchOrFile, (err, stats) => {
    if (err) throw err;
    if (stats.isFile()) {
      const fileMd = checkFileMd(routeArchOrFile);
      if (fileMd) {
        // arrFilesMd.push(routeArchOrFile)
        readFileMd(routeArchOrFile, links);
        // const arrFilesMd = filesMd.push(routeArchOrFile);
      }
    } else if (stats.isDirectory()) {
      fs.readdir(routeArchOrFile, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          travelArchFile(path.join(`${routeArchOrFile}`, `${file}`), links);
        });
      });
    }
  });
}

module.exports = travelArchFile;
