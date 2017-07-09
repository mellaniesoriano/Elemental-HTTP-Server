/* jshint esversion: 6 */

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const fetchHtmlFiles = (fileName) => fs.readFileSync(fileName);

const indexHTML = fetchHtmlFiles('./public/index.html');
const heliumHTML = fetchHtmlFiles('./public/helium.html');
const hydrogenHTML = fetchHtmlFiles('./public/hydrogen.html');
const cssStyles = fetchHtmlFiles('./public/css/styles.css');

const server = http.createServer( (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.destroy();


}).listen(8080);

const writeHeader = (res, status, fileType, fileName) => {
  res.writeHead(`HTTP/1.1 ${status}
Server: Mellanie's Super Awesome Server
Date: ${new Date().toUTCString()};
Content-Type: ${fileType}; charset=utf-8
Content-Length: ${fileName.length}
Connection: keep-alive

${fileName}`);
};

