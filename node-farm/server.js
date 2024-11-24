import http from 'http';
import url from 'url';
import getProducts from './scripts/products.js';
import { fillTemplate, templates } from './scripts/templates.js';

const products = getProducts();

// Server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  switch (pathname) {
    // Overview Route (main route)
    case '/':
    case '/overview':
      res.writeHead(200, {
        'Content-type': 'text/html',
      });
      const cardsHtml = products.map((el) => fillTemplate(templates.card, el));
      const ovewviewPage = templates.overview.replace(
        '{%PRODUCT_CARDS%}',
        cardsHtml
      );
      res.end(ovewviewPage);
      break;

    // Product Route
    case '/product':
      res.writeHead(200, {
        'Content-type': 'text/html',
      });
      const product = products.find((el) => el.id === parseInt(query.id));
      const productPage = fillTemplate(templates.product, product);
      res.end(productPage);
      break;

    // API
    case '/api':
      res.writeHead(200, {
        'Content-type': 'application/json',
      });
      res.end(JSON.stringify(products));
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
