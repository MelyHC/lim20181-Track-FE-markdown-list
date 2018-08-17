#!/usr/bin/env node

const fs = require('fs');
// const path = require('path');
const [, , ...args] = process.argv

const readArchFile = () => {
  fs.stat(`${args}`, (err, data) => {
    if (data.isFile()) {
      fs.readFile(`${args}`, (err, data) => {
        if (err) throw err;
        console.log(data.toString());
      });
    } else if (data.isDirectory()) {
      fs.readdir(`${args}`, (err, files) => {
        if (err) throw err;
        console.log(files.toString());
      });
    }
  });

}

readArchFile();
