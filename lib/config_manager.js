const fs = require('fs-extra');
const path = require('path');
let CONFIG = require('./config.json');
let ERRORS = require('./errors');

const EXTENSION = {
  template: 'cpp',
  runscript: 'sh'
};

/*
 * A function to update the config.json
 */
const updateConfig = config => {
  return fs.writeFile(path.join(__dirname, `config.json`), JSON.stringify(config, null, 2), err => {
    if (err) {
      console.log(ERRORS.PERMISSIONS_ERROR);
    }
  });
}

/*
 * A function to set the specified file, by
 *  1. making a copy of the file and
 *  2. manipulating the config.json file
 */
const setFile = (type, src) => {

  if (src === 'default') {

    // set type to default
    CONFIG[type] = `codr_default_${type}.${EXTENSION[type]}`;
    return updateConfig(CONFIG);

  } else if (src === 'off') {

    // set type to off
    CONFIG[type] = 'off';
    return updateConfig(CONFIG);

  }

  // set type to path
  const NEW_EXTENSION = path.extname(src);
  CONFIG[type] = path.basename(src);
  fs.copy(src, path.join(__dirname, path.basename(src)))
    .then(() => updateConfig(CONFIG))
    .catch(e => {
      console.log(ERRORS.PERMISSIONS_ERROR);
    });

}

exports.setFile = setFile;
