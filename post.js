/* jshint esversion: 6 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const createElements = require('./templateBuilder');
const pathArray = [];

module.exports = (req, res, data) => {
  let elementChunk = querystring.parse(data.toString());
  elementName = elementChunk.elementName;
  elementSymbol = elementChunk.elementSymbol;
  elementAtomicNumber = elementChunk.elementAtomicNumber;
  elementDescription = elementChunk.elementDescription;

  // creates new elements
  let newElements = fs.createWriteStream(`./public/${elementName}.html`);
  let makeHtml = createElements.templateBuilder(elementName, elementSymbol, elementAtomicNumber, elementDescription);
  newElements.write(makeHtml);
  let readingIndex = fs.readFileSync('./public/index.html', 'utf-8');
  pathArray.push(`/${elementName.toLowerCase()}.html`);
  // adds new link to index.html
  createElements.htmlLink(elementName);

  let appendElements = readingIndex.replace(/(<!-- insert new element  -->)/g, createElements.htmlLink(elementName));

  let number = 1;
  let indexSplit = readingIndex.split('\n');
  for(let i = 0; i < indexSplit.length; i++){
    if(indexSplit[i].endsWith('</a>')){
      number++;
    }
  }
  appendElements = appendElements.replace(/(<h3>There are [^A-Z])/g, `<h3>There are ${number}`);

  fs.writeFile('./public/index.html', appendElements, 'utf-8', (err) => {
    if (err) throw err;

    let successMsg = JSON.stringify({"success" : true});
    res.writeHead(200, {'Content-Type' : 'application/json'});
    res.end(successMsg);
  });
};