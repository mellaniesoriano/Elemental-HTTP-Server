/* jshint esversion: 6 */

const templateBuilder = (elementName, elementSymbol, elementAtomicNumber, elementDescription) => {
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

const htmlLink = (elementName) => {
  return `<li>
  <a href="/${elementName}.html">${elementName}</a>
</li>
<!-- insert new element  -->`;
};

module.exports = {
  templateBuilder,
  htmlLink
};