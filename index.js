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
  if (options.validate === true) {
    if (fs.existsSync(route)) {
      console.log('existe')
      console.log(options.stats)
    } else {
      console.log('no existe')
    }
  }
}
// const checkRoute = (directory) => {
//   try {
//     process.chdir(directory);
//     // console.log(process.cwd())
//     readArchFile(directory);
//   } catch (err) {
//     console.log('La ruta no se encontró');
//   }
// }

const readArchFile = (argument, option) => {
  // console.log(route)
  fs.stat(argument, (err, stats) => {
    if (stats.isFile()) {
      fs.readFile(argument, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('hola');
        console.log()
      });
    }
    if (stats.isDirectory()) {
      fs.readdir(argument, (err, files) => {
        if (err) throw err;
        // console.log(files);
        for (let i = 0; i < files.length; i++) {
          readArchFile(argument + '/' + files[i])
        }
        // readArchFile(files[0])
      });
    }
  });
}

// checkRoute(args[0]);
// readArchFile(args[0]);
program
  .option('-v, --validate', 'Validar links si estan rotos o no')
  .option('-s, --stats', 'Mostrar stats de los links')
  .action(mdlinks)
  .parse(process.argv);
