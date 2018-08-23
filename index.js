#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const fetch = require('node-fetch');
const marked = require('marked')

const options = {
  validate: program.validate,
  stats: program.stats
}

const createObject = (route, url, description) => {
  return new object(href = url,
    text = description,
    file = route
  );
}

const checkFileMd = (nameFile) => {
  const extMd = /\.(md|mkdn|mdown|markdown?)$/i;
  return extMd.test(path.extname(nameFile))
}

const readFile = (file) => {
  // console.log(file)
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    const newStructureMd = marked(data);
    // let arrTextUrl = str.match(expLink)
    const splitMd = newStructureMd.split('<');
    splitMd.forEach( lines => {
      const linesLink = lines.match('a ')
      console.log(linesLink)
    }) 
  })
}

const travelArchFile = (routeArchOrFile) => {
  const arrFilesMd = [];
  fs.stat(routeArchOrFile, (err, stats) => {
    if (err) throw err;
    if (stats.isFile()) {
      const fileMd = checkFileMd(routeArchOrFile);
      if (fileMd) {
        // arrFilesMd.push(routeArchOrFile)
        readFile(routeArchOrFile);
        // const arrFilesMd = filesMd.push(routeArchOrFile);
      }
    } else if (stats.isDirectory()) {
      fs.readdir(routeArchOrFile, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          travelArchFile(path.join(`${routeArchOrFile}`, `${file}`));
        });
      });
    }

  });
}

const mdlinks = (route, options) => {
  // return new Promise((resolve, reject) => {

  // })
  const travelFile = travelArchFile(path.resolve(route));
}
// checkRoute(args[0]);
// readArchFile(args[0]);
program
  .option('-v, --validate', 'Validar links si estan rotos o no')
  .option('-s, --stats', 'Mostrar stats de los links')
  .action(mdlinks)
  .parse(process.argv);
