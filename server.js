/* jshint esversion: 6 */

const http = require('http');
const net = require("net");
const fs = require('fs');
const date = new Date();
const request = require('request');
const querystring = require('querystring');
let para = null;
let body = [];
var result = null;

//Functions
//
const sort = (path,link)=>{
  return {
    path : path,
    link : link
  };
};

const urlChecker = (url)=>{
  body.forEach((e)=>{
    if(e.path === url){
      para = e.link;
    }
  });
};

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
              <link rel="stylesheet" href="/css/styles.css">
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
// Need to make everything DRY.
//
const index = fetchHtmlFiles('./public/index.html');
body.push(sort("/", index.toString()));
body.push(sort("/index.html", index.toString()));
const helium = fetchHtmlFiles('./public/helium.html');
body.push(sort("/helium.html", helium.toString()));
const hydrogen = fetchHtmlFiles('./public/hydrogen.html');
body.push(sort("/hydrogen.html", hydrogen.toString()));
const styles = fetchHtmlFiles('./public/css/styles.css');
body.push(sort("/styles.html", styles.toString()));
const four0Four = fetchHtmlFiles('./public/404.html');
body.push(sort("/404.html", four0Four.toString()));

//Create HTTP server
//
const server = http.createServer( (req, res) => {
//POST start
if (req.method === 'POST') {
  req.on('data', (data) => {
    var chunk = data.toString();
    var parsedChunk = querystring.parse(chunk);
    var html = createElement(parsedChunk.elementName, parsedChunk.elementSymbol, parsedChunk.elementAtomicNumber, parsedChunk.elementDescription);
    fs.writeFile(`./public/${parsedChunk.elementName}.html`, html, (err) => {
      if (err) throw err;
        result = fs.readFileSync(`./public/${parsedChunk.elementName}.html`);
        body.push(sort(`/${parsedChunk.elementName.toLowerCase()}.html`, result.toString()));
      });
  });
}//POST end

//GET start
  else if (req.method === 'GET') {
   urlChecker(req.url);
   header(para,res);
  }//GET end

  setTimeout(() =>{
    res.end();
    console.log(body.length);
  },10);
}).listen(8080);
//Server end



