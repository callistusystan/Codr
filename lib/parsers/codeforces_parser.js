const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio')
const codr = require('../codr');
const Parser = require('./parser');

class CodeforcesParser extends Parser {
  constructor(directory, URL) {
    super(directory, URL);

    // set problemName
    this.problemName = URL.match(/\d+/g)+URL.charAt(URL.length-1);
  }

  clean(arr) {
    return _.map(arr, (data, i) => {
      let content = "";
      data.children.forEach(node => {
        if (node.type == 'text') {
          content += node.data;
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

  setupContest(directory, problems) {
    const requests = _.map(problems, ({ attribs: { href } }) => {
      return codr.extract(directory, `http://codeforces.com${href}`);
    });

    // Perform all requests asynchronously
    Promise.all(requests);
  }

  parse() {
    axios.get(this.URL)
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const inputs = $('.input pre');
        const outputs = $('.output pre');
        const problems = $('.problems tbody tr td div div a');

        // Checks if there are things to parse
        if (inputs.length === 0 && outputs.length === 0 && problems.length === 0)
          return console.log(ERRORS.BAD_CODEFORCES_URL);

        // Calls the appropriate setup functions
        if (outputs.length) {
          this.inputs = this.clean(inputs);
          this.outputs = this.clean(outputs);
          super.setup();
        } else if (problems.length) this.setupContest(directory, problems);
        else console.log(ERRORS.UNABLE_TO_HANDLE);
      })
      .catch(e => {
        console.log("Error: Unable to fetch data from URL");
      });
  }
}

module.exports = CodeforcesParser;
