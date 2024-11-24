import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import fs from 'fs';

// Variables equivalents to __dirname and __filename in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Templates
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

// Products data
const productsText = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  'utf-8'
);
const products = JSON.parse(productsText);

// Auxiliary functions
const replaceTemplate = (temp, product) => {
  let output = temp.replaceAll('{%PRODUCTNAME%}', product.productName);
  output = output.replaceAll('{%IMAGE%}', product.image);
  output = output.replaceAll('{%PRICE%}', product.price);
  output = output.replaceAll('{%FROM%}', product.from);
  output = output.replaceAll('{%NUTRIENTS%}', product.nutrients);
  output = output.replaceAll('{%QUANTITY%}', product.quantity);
  output = output.replaceAll('{%DESCRIPTION%}', product.description);
  output = output.replaceAll('{%ID%}', product.id);
  return output;
};

// Server
const server = http.createServer((req, res) => {
  const route = req.url;

  switch (route) {
    // Overview Route (main route)
    case '/':
    case '/overview':
      res.writeHead(200, {
        'Content-type': 'text/html',
      });
      const cardsHtml = products.map((el) => replaceTemplate(cardTemplate, el));
      const output = overviewTemplate.replace('{%PRODUCT_CARDS%}', cardsHtml);
      res.end(output);
      break;

    // Product Route
    case '/product':
      res.end('This is the product');
      break;

    // API
    case '/api':
      res.writeHead(200, {
        'Content-type': 'application/json',
      });
      res.end(productsText);
      break;

    // 404
    default:
      res.writeHead(404, {
        'Content-type': 'text/html',
      });
      res.end(`<h1>Page not found!</h1>`);
      break;
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
