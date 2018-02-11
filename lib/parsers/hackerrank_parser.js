const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio')
const codr = require('../codr');
const Parser = require('./parser');
const ERRORS = require('../errors');

class HackerrankParser extends Parser {
  constructor(directory, URL) {
    super(directory, URL);

    // set problemName
    this.problemName = (URL.match(/challenges\/[^\?\/]*/g) + '').substr(11);
  }

  clean(arr) {
    return _.map(arr, (data, i) => {
      let content = "";
      data.children.forEach(root => {
        let node = root;
        while (node.children && node.children.length > 0) {
          node = node.children[0];
        }
        if (node.data) {
          content += node.data;
        }
      });

      // Add a newline at the end of input if not already there
      if (content.charAt(content.length-1) != '\n')
        content += '\n';
      return content;
    });
  }

  parse() {
    let url = `https://www.hackerrank.com/rest/contests/master/challenges/${this.problemName}`;
    if (this.URL.match(/\/contests\//)) {
      const contest = (this.URL.match(/\/contests\/[^\?\/]*/g) + '').substr(9);
      url = `https://www.hackerrank.com/rest/contests/${contest}/challenges/${this.problemName}`;
    }
    axios.get(url)
      .then(({ data }) => {
        let $ = cheerio.load(data.model.body_html);
        const pres = $('pre');
        let inputs = [];
        let outputs = [];

        _.forEach(pres, (data, i) => {
          if (i%2) outputs.push(data);
          else inputs.push(data);
        });

        // Checks if there are things to parse
        if (inputs.length === 0 && outputs.length === 0)
          return console.log(ERRORS.BAD_HACKERRANK_URL);

        // Calls the appropriate setup functions
        if (outputs.length) {
          this.inputs = this.clean(inputs);
          this.outputs = this.clean(outputs);
          super.setup();
        } else console.log(ERRORS.UNABLE_TO_HANDLE);
      })
      .catch(e => {
        console.log(ERRORS.UNABLE_TO_FETCH);
      });
  }
}

module.exports = HackerrankParser;
