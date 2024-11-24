import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import fs from 'fs';

// Variables equivalents to __dirname and __filename in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Server
const productsData = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  const route = req.url;

  switch (route) {
    case '/':
    case '/overview':
      res.end('This is the overview');
      break;
    case '/product':
      res.end('This is the product');
      break;
    case '/api':
      res.writeHead(200, {
        'Content-type': 'application/json',
      });
      res.end(productsData);
      break;
    default:
      res.writeHead(404, {
        'Content-type': 'text/html',
      });
      res.end(`<h1>Hello from the server, but... Page not found!</h1>`);
      break;
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
