/* jshint esversion: 6 */

const http = require('http');
const net = require("net");
const fs = require('fs');
const date = new Date();
const request = require('request');

const querystring = require('querystring');
let para = null;

const fetchHtmlFiles = (fileName) => fs.readFileSync(fileName);

const index = fetchHtmlFiles('./public/index.html');
const helium = fetchHtmlFiles('./public/helium.html');
const hydrogen = fetchHtmlFiles('./public/hydrogen.html');
const styles = fetchHtmlFiles('./public/css/styles.css');

const server = http.createServer( (req, res) => {

  // if (req.method === 'GET') {
    switch(req.url){
    case "/index.html":
      para = index;
    break;
    case "/helium.html":
      para = helium;
    break;
    case "/hydrogen.html":
      para = hydrogen;
    break;
    case "/css/styles.css":
      para = styles;
    break;
    // need to work on this :
    // case "/elements":
    //   code in here;
    // break;
    default:
     para = index;
  }
// }

const createElement = (elementName, elementSymbol, elementAtomicNumber, elementDescription) => {
  return  `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>The Elements - ${elementName}</title>
              <link rel="stylesheet" href="/public/css/styles.css">
            </head>
            <body>
              <h1>${elementName}</h1>
              <h2>${elementSymbol}</h2>
              <h3>Atomic number ${elementAtomicNumber}</h3>
              <p>${elementDescription}</p>
              <p><a href="/">back</a></p>
            </body>
            </html>`;

};

if (req.method === 'POST') {
  let body = [];
  req.on('data', (data) => {
    var chunk = data.toString();
    var parsedChunk = querystring.parse(chunk);
    body.push(parsedChunk);
    console.log(createElement(parsedChunk.elementName, parsedChunk.elementSymbol, parsedChunk.elementAtomicNumber, parsedChunk.elementDescription));
    res.write(body);
    res.end();
  });
}
  header(para,res);
  res.end();

  // var headers = header(para, res);

  // const options = {
  //   url : req.url,
  //   method : 'POST',
  //   headers : headers,
  //   form : {'key1' : 'val1', 'key2' : 'val2'}
  // };

  // request(options, (error, response, body) => {
  //   if(!error && response.statusCode === 200) {
  //     console.log(body);
  //   }
  // });

}).listen(8080);

function header(page, res){
  if(page === styles){
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(para);

  }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(para);

  }
}

// const postCode = (codeStr) => {
//   let varData = querystring.stringify({

//   });
// };