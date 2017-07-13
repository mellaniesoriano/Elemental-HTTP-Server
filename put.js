/* jshint esversion: 6 */
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const createElements = require('./templateBuilder');


// const checkDirectory = (url)=>{
//   fs.readdir("./public", (files)=>{
//    console.log(files);
//    files.forEach((e)=>{
//     if(e === url){
//       let successMsg = JSON.stringify({"success" : true });
//       res.writeHead(200, {'Content-Type': 'application/json'});
//       res.end(successMsg);
//     }else{
//       let errorMsg = JSON.stringify(`{"error" : "${req.url} does not exist!"}`);
//       res.writeHead(500, {'Content-Type': 'application/json'});
//       res.end(errorMsg);
//     }
//   });
//  });
// };

module.exports = (req, res, data) => {
  let elementChunk = querystring.parse(data.toString());
  elementName = elementChunk.elementName;
  elementSymbol = elementChunk.elementSymbol;
  elementAtomicNumber = elementChunk.elementAtomicNumber;
  elementDescription = elementChunk.elementDescription;

  let makeElems = createElements.templateBuilder(elementName, elementSymbol, elementAtomicNumber, elementDescription);
  let readingElement = fs.readFileSync(`./public${req.url}`, 'utf-8');

  fs.writeFile(`./public${req.url}`, makeElems, 'utf-8', (err) => {
    if (err) throw err;
    //checkDirectory(req.url);
    let successMsg = JSON.stringify({"success" : true });
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(successMsg);
    res.end();

  });
};





