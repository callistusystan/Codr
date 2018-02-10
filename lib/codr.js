const ERRORS = require('./errors');
const CodeforcesParser = require('./parsers/codeforces_parser');
const HackerrankParser = require('./parsers/hackerrank_parser');

/*
 * Function that loads the web page, and extracts data
 *    After data has been extracted, calls the appropriate setup functions
 */
const extract = (directory, URL) => {
  let parser;
  if (URL.match(/codeforces.com/))
    parser = new CodeforcesParser(directory, URL);
  else if (URL.match(/hackerrank.com/))
    parser = new HackerrankParser(directory, URL);
  else return console.log(ERRORS.UNKNOWN_PLATFORM);
  parser.parse();
}

module.exports.extract = extract;
