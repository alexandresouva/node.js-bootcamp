import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Variables equivalents to __dirname and __filename in CommonJS
const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesPath = path.join(__dirname, '../templates');

const overviewTemplate = fs.readFileSync(
  `${templatesPath}/template-overview.html`,
  'utf-8'
);
const cardTemplate = fs.readFileSync(
  `${templatesPath}/template-card.html`,
  'utf-8'
);
const productTemplate = fs.readFileSync(
  `${templatesPath}/template-product.html`,
  'utf-8'
);

export const templates = {
  overview: overviewTemplate,
  card: cardTemplate,
  product: productTemplate
};

export const fillTemplate = (originalTemplate, product) => {
  const newTemplate = originalTemplate
    .replaceAll('{%PRODUCTNAME%}', product.productName)
    .replaceAll('{%IMAGE%}', product.image)
    .replaceAll('{%PRICE%}', product.price)
    .replaceAll('{%FROM%}', product.from)
    .replaceAll('{%NUTRIENTS%}', product.nutrients)
    .replaceAll('{%QUANTITY%}', product.quantity)
    .replaceAll('{%DESCRIPTION%}', product.description)
    .replaceAll('{%ID%}', product.id)
    .replaceAll('{%NOT_ORGANIC%}', product.organic ? '' : 'not-organic');
  return newTemplate;
};
