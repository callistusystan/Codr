#!/usr/bin/env node
const config_manager = require('../lib/config_manager');
const codr = require('../lib/codr');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs-extra');
const ERRORS = require('../lib/errors');

const main = () => {
  if (argv.h || argv.help) {

    // show help file
    fs.readFile(
      './help',
      { encoding: 'utf8' },
      (err, text) => {
        console.log(text);
      }
    );

  } else if (argv.t || argv.template) {

    // set template
    const path =  argv.t || argv.template;

    if (!path) return console.log(ERRORS.NO_PATH);
    else if (path === 'default') return config_manager.setFile('template', path);
    else if (!fs.existsSync(path)) return console.log(ERRORS.INVALID_PATH);
    config_manager.setFile('template', path);

  } else if (argv.r || argv.runscript) {

    // set runscript
    const path =  argv.r || argv.runscript;

    if (!path) return console.log(ERRORS.NO_PATH);
    else if (path === 'default' || path === 'off') return config_manager.setFile('runscript', path);
    else if (!fs.existsSync(path)) return console.log(ERRORS.INVALID_PATH);
    config_manager.setFile('runscript', path);

  } else {

    // extract data
    if (argv._.length > 2) return console.log(ERRORS.TOO_MANY_ARGUMENTS);

    // parse args
    const [directory, URL] = argv._;
    if (!directory) return console.log(ERRORS.NO_EXTRACT_ARGUMENTS);
    if (!URL) return codr.extract(directory, "none")
    try {
      codr.extract(directory, URL);
    } catch (e) {
      console.log(e);
    }

  }
}

main();
