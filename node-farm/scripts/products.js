import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Variables equivalents to __dirname and __filename in CommonJS
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data');

const productsText = fs.readFileSync(`${dataPath}/products.json`, 'utf-8');
const getProducts = () => JSON.parse(productsText);
export default getProducts;
