const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs-extra');
const path = require('path');
let CONFIG = require('../config.json');
const ERRORS = require('../errors');

// GlOBAL VARIABLES
const TEMPLATE_FILE = CONFIG.template;
const RUN_SCRIPT = CONFIG.runscript;

class Parser {
  constructor(directory, URL) {
    this.directory = directory;
    this.URL = URL;

    // TO BE SET BY SUBCLASS
    this.problemName = "program";
    this.inputs = [''];
    this.outputs = [''];
  }

  createFiles(destDir, arr, prefix) {
    // iterate each element
    arr.forEach((content, i) => {
      // write file to directory
      fs.writeFile(`${destDir}/${prefix}${i+1}`, content, (err) => {
          if (err) return console.log(err);
      });
    });
  }

  setup() {
    // Check if need to create container directory
    if (!fs.existsSync(this.directory))
      fs.mkdirSync(this.directory);

    const destDir = path.join(this.directory, this.problemName);
    // Check if can create problem directory
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
    else return console.log(ERRORS.PROBLEM_FOLDER_EXIST);

    this.createFiles(destDir, this.inputs, 'in');
    this.createFiles(destDir, this.outputs, 'out');

    fs.copy(`${__dirname}/../${TEMPLATE_FILE}`, path.join(destDir, `${this.problemName}${path.extname(TEMPLATE_FILE)}`));
    if (RUN_SCRIPT !== 'off')
      fs.copy(`${__dirname}/../${RUN_SCRIPT}`, path.join(destDir, (RUN_SCRIPT === 'codr_default_runscript.sh' ? 'test.sh' : RUN_SCRIPT)));
  }

  parse() {
    this.setup();
  }
}

module.exports = Parser;
