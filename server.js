/* jshint esversion: 6 */

const http = require('http');
const net = require("net");
const fs = require('fs');
const date = new Date();
const querystring = require('querystring');
let para = null;

const fetchHtmlFiles = (fileName) => fs.readFileSync(fileName);

const index = fetchHtmlFiles('./public/index.html');
const helium = fetchHtmlFiles('./public/helium.html');
const hydrogen = fetchHtmlFiles('./public/hydrogen.html');
const styles = fetchHtmlFiles('./public/css/styles.css');

const server = http.createServer( (req, res) => {
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
    default:
     para = index;
  }
  header(para,res);
  res.end();
}).listen(8080);;

function header(page, res){
  if(page === styles){
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(para);
  }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(para);
  }
}


