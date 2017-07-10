/* jshint esversion: 6 */

const http = require('http');
const net = require("net");
const fs = require('fs');
const date = new Date();
const request = require('request');
const querystring = require('querystring');
let para = null;
let body = [];

//Functions
//
const fetchHtmlFiles = (fileName) => fs.readFileSync(fileName);

const header = (page, res) =>{
  if(page === styles){
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(para);
  }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(para);
  }
};

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
// Maybe should go into an array and have the new ones be dynamically push into the array aswell?
//
const index = fetchHtmlFiles('./public/index.html');
const helium = fetchHtmlFiles('./public/helium.html');
const hydrogen = fetchHtmlFiles('./public/hydrogen.html');
const styles = fetchHtmlFiles('./public/css/styles.css');
const four0Four = fetchHtmlFiles('./public/404.html');

//Create HTTP server
//
const server = http.createServer( (req, res) => {
//GET start
  if (req.method === 'GET') {
    switch(req.url){
      case "/":
        para = index;
      break;
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
       para = four0Four;
    }
   header(para,res);
  }//GET end

//POST start
  else if (req.method === 'POST') {
    var result = null;
    req.on('data', (data) => {
      var chunk = data.toString();
      var parsedChunk = querystring.parse(chunk);
      body.push(parsedChunk);
      var html = createElement(parsedChunk.elementName, parsedChunk.elementSymbol, parsedChunk.elementAtomicNumber, parsedChunk.elementDescription);
      fs.writeFile(`./public/${parsedChunk.elementName}.html`, html, (err) => {
        if (err) throw err;
        result = fs.readFileSync(`./public/${parsedChunk.elementName}.html`);
      });
    });
    setTimeout(() =>{
   //if(req.url === `/${parsedChunk.elementName}.html`){
      console.log(req.url.split(' ')[0]);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(result.toString());
      res.end();
   //}
    },10);
  }//POST end

  setTimeout(() =>{
    res.end();
    console.log(body);
  },10);
}).listen(8080);
//Server end




//Old POST code just using it for refererence.

  //  else if (req.method === 'POST') {
  //   let body = [];
  //   req.on('data', (data) => {
  //     var result = null;
  //     var chunk = data.toString();
  //     var parsedChunk = querystring.parse(chunk);
  //     body.push(parsedChunk);
  //     var html = createElement(parsedChunk.elementName, parsedChunk.elementSymbol, parsedChunk.elementAtomicNumber, parsedChunk.elementDescription);
  //     console.log(typeof html);
  //     fs.writeFile(`./public/${parsedChunk.elementName}.html`, html, (err) => {
  //       if (err) throw err;
  //       result =fs.readFileSync(`./public/${parsedChunk.elementName}.html`);
  //     });
  //     res.write(header(result, res));
  //   });
  // }
  // res.end();
  // }).listen(8080);