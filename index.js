#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
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

const mdlinks = (route, options) => {
  return new Promise((resolve, reject) => {
    const links = [];
    travelArchFile(path.resolve(route), links);
    setTimeout(() => {
      // if (links.length !== 0) {
      resolve(links)
      // } else {
      // reject('El archivo no tiene links')
      // }
    }, 500);
  })
}

const countLinks = (arrLinks) => {
  let countTotalLinks = 0;
  let countUniqueLinks = 0;
  console.log(new Set(arrLinks).size)
  arrLinks.forEach(objLink => {
    countTotalLinks++
  })
  return [`Total: ${countTotalLinks}`, `Unique: ${countUniqueLinks}`]
}

program
  .option('-v, --validate', 'Validar links si estan rotos o no')
  .option('-s, --stats', 'Mostrar stats de los links')
  .action(mdlinks)
  .parse(process.argv);

const options = {
  validate: program.validate,
  stats: program.stats
}

mdlinks(program.args[0], options)
  .then(arrLinks => {
    if (options.validate && options.stats) {
      console.log('stats y validate')
    } else if (options.stats) {
      console.log(countLinks(arrLinks))
    } else if (options.validate) {
      console.log('validate')
    } else {
      arrLinks.forEach(link => {
        console.log(`${link.file}  ${link.href}  ${link.text}`)
      })
    }
  })
  .catch(err => console.error)
