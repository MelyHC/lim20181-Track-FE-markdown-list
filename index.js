#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
// const fetch = require('node-fetch');
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
      resolve(links)
    }, 500);
  })
}

/* const test = async (route, options) => {
  await mdlinks(route, options);
} */

program
  .arguments('file')
  .option('-v, --validate', 'Validar links si estan rotos o no')
  .option('-s, --stats', 'Mostrar stats de los links')
  .action(mdlinks)
  .parse(process.argv);

const options = {
  validate: program.validate,
  stats: program.stats
}

/* test(program.args[0], options).then((result) => {
  console.log(result);
}) */

mdlinks(program.args[0], options)
  .then(arrLinks => {
    arrLinks.forEach(link => {
      console.log(`${link.file}  ${link.href}  ${link.text}`)
    })
  })
