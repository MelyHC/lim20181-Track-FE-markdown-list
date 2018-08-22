#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const fetch = require('node-fetch');

const options = {
  validate: program.validate,
  stats: program.stats
}

const mdlinks = (route, options) => {
  if (fs.existsSync(route)) {
    const travelFile = travelArchFile(path.resolve(route));
  } else {
    console.log('La ruta del archivo o carpeta no existe');
  }
}

const travelArchFile = (routeArchOrFile) => {
  fs.stat(routeArchOrFile, (err, stats) => {
    if (err) throw err;
    if (stats.isFile()) {
      const fileMd = checkFileMd(routeArchOrFile);
      if (fileMd) {
        // readFile(routeArchOrFile);
        console.log(routeArchOrFile)
      }
    } else if (stats.isDirectory()) {
      fs.readdir(routeArchOrFile, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          travelArchFile(`${routeArchOrFile}\\${file}`)
        });
      });
    }
  });
}

const checkFileMd = (nameFile) => {
  const extMd = /\.(md|mkdn|mdown|markdown?)$/i;
  return extMd.test(path.extname(nameFile))
}

const createObject = (route, url, description) => {
  return new object(href = url,
    text = description,
    file = route)


}

const readFile = (file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    while (data.length) {

    }
  })
}

// checkRoute(args[0]);
// readArchFile(args[0]);
program
  .option('-v, --validate', 'Validar links si estan rotos o no')
  .option('-s, --stats', 'Mostrar stats de los links')
  .action(mdlinks)
  .parse(process.argv);
