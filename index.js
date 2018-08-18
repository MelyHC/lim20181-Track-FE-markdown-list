#!/usr/bin/env node

const fs = require('fs');
// const path = require('path');
const [, , ...args] = process.argv

// const checkRoute = (directory) => {
//   try {
//     process.chdir(directory);
//     // console.log(process.cwd())
//     readArchFile(directory);
//   } catch (err) {
//     console.log('La ruta no se encontró');
//   }
// }

const readArchFile = (argument) => {
  // console.log(route)
  fs.stat(argument, (err, stats) => {
    if (stats.isFile()) {
      fs.readFile(argument, (err, data) => {
        if (err) throw err;
        console.log(data.toString());
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
readArchFile(args[0]);
