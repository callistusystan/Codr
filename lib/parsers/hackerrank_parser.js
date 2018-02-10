const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio')
const codr = require('../codr');
const Parser = require('./parser');

class HackerrankParser extends Parser {
  constructor(directory, URL) {
    super(directory, URL);

    // set problemName
    this.problemName = (URL.match(/challenges\/[^\/]*/g) + '').substr(11);
  }

  clean(arr) {
    return _.map(arr, (data, i) => {
      let content = "";
      data.children.forEach(node => {
        if (node.name && node.name !== 'text') {
          console.log(node);
          content += node.children[0].data;
        } else {
          content += '\n';
        }
      });

      // Add a newline at the end of input if not already there
      if (content.charAt(content.length-1) != '\n')
        content += '\n';
      return content;
    });
  }

  parse() {
    let type = 'normal';
    let url = this.URL;
    if (this.URL.match(/projecteuler/)) {
      type = 'euler';
      url = `https://www.hackerrank.com/rest/contests/projecteuler/challenges/${this.problemName}`;
    }
    axios.get(url)
      .then(({ data }) => {
        let $;
        if (type === 'normal') $ = cheerio.load(data);
        else if (type === 'euler') $ = cheerio.load(data.model.body_html);
        const inputs = $('.challenge_sample_input pre');
        const outputs = $('.challenge_sample_output pre');

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
        console.log("Error: Unable to fetch data from URL");
      });
  }
}

module.exports = HackerrankParser;
