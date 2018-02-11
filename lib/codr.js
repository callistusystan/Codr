const Parser = require('./parsers/parser');
const CodeforcesParser = require('./parsers/codeforces_parser');
const HackerrankParser = require('./parsers/hackerrank_parser');
const ERRORS = require('./errors');

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
  else if (URL.match(/.com/))
    return console.log(ERRORS.UNKNOWN_PLATFORM);
  else
    parser = new Parser(directory, URL);
  parser.parse();
}

module.exports.extract = extract;
