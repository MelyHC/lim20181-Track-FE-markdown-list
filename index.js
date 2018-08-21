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
    // const routeFile = 
    const travelFile = travelArchFile(path.resolve(route));
    // console.log(travelFile)
  } else {
    console.log('La ruta del archivo o carpeta no existe');
  }
}

const travelArchFile = (routeArchOrFile) => {
  fs.stat(routeArchOrFile, (err, stats) => {
    if (stats.isFile()) {
      // console.log(routeArchOrFile)
      const fileMd = checkFileMd(routeArchOrFile);
      // return fileMd
      // abs(true)
    } else if (stats.isDirectory()) {
      fs.readdir(routeArchOrFile, (err, files) => {
        if (err) throw err;
        // console.log(files);
        for (let i = 0; i < files.length; i++) {
         travelArchFile(`${routeArchOrFile}\\${files[i]}`)
        }
      });
    }
  });
}

const checkFileMd = (nameFile) => {
  const extMd = /\.(md|mkdn|mdown|markdown?)$/i;
  if (extMd.test(path.extname(nameFile))) {
    return true
  } else {
    return false
  }
}

const readFile = (file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if  (err) throw err;
    console.log(data)
  })
}

// checkRoute(args[0]);
// readArchFile(args[0]);
program
  .option('-v, --validate', 'Validar links si estan rotos o no')
  .option('-s, --stats', 'Mostrar stats de los links')
  .action(mdlinks)
  .parse(process.argv);
