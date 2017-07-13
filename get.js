/* jshint esversion: 6 */
const http = require('http');
const fs = require('fs');
const templateBuilder = require('./templateBuilder');

module.exports = (req, res) => {
  if (req.url === '/'){
    fs.readFile(`./public/index.html`, (err, data) => {
      res.end(data);
    });
  } else {
    fs.readFile(`./public${req.url}`, (err, data) => {
      if(err){
        fs.readFile('./public/404.html', (err, data) => {
          res.end(data);
        });
      } else {
        res.end(data);
      }
    });
  }
};
