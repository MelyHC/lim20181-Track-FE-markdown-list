#!/usr/bin/env node

const program = require('commander');
const mdLinks = require('./index.js')

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
    .then(arrLinks => {
      if (options.stats && options.validate) {
        console.log(`Total: ${arrLinks.total} \nUnique: ${arrLinks.unique} \nBroken: ${arrLinks.broken} `);
      } else if (options.stats) {
        console.log(`Total: ${arrLinks.total} \nUnique: ${arrLinks.unique}`);
      } else if (options.validate) {
        arrLinks.forEach(linksData => {
          console.log(`${linksData.file}\t ${linksData.href}\t ${linksData.statusText}\t ${linksData.status} \t ${linksData.text}`)
        });
      } else if (Array.isArray(arrLinks)) {
        arrLinks.forEach(linksData => {
          console.log(`${linksData.file}\t ${linksData.href}\t ${linksData.text}`);
        });
      } else {
        console.log(arrLinks);
      }
    })
}