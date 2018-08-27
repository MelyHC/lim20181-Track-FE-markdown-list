#!/usr/bin/env node

const program = require('commander');
const mdLinks = require('./main.js')

program
  .arguments('<path>')
  .option('-v, --validate', 'Validar links si estan rotos o no')
  .option('-s, --stats', 'Mostrar stats de los links')
  .action(mdLinks)
  .parse(process.argv);

const options = {
  validate: program.validate,
  stats: program.stats
}
const route = program.args[0];

if (!route) {
  console.log('Debes ingresar la ruta de un archivo o carpeta')
} else {
  mdLinks(route, options)
    .then(arrLinks => console.log(arrLinks))
}