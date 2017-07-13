/* jshint esversion: 6 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const templateBuilder = require('./templateBuilder');
const postHandler = require('./post.js');
const getHandler = require('./get.js');
const putHandler = require('./put.js');

//Create HTTP server
//
const server = http.createServer( (req, res, data) => {
  switch (req.method) {
    case 'POST' :
    req.on('data', (data) => {
      postHandler(req, res, data);
    });
  break;

  case 'GET' :
    getHandler(req, res);
  break;

  case 'PUT' :
    req.on('data', (data) => {
      putHandler(req, res, data);
    });
  }

}).listen(8080);
//Server end

