/* eslint-disable no-console */
import fs from 'fs';

const printLine = () => console.log('--------------------------------');

console.log('🌽 Node Farm 🥦');
// Blocking, synchronous way
const textInTxt = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(`This text was read from the input.txt file:\n${textInTxt}`);
const textOut = `Avocado\nThis is what we know about the avocado: ${textInTxt}.\nCreated on ${new Date().toLocaleString()}`;
fs.writeFileSync('./txt/output.txt', textOut);

printLine();

// Non-blocking, asynchronous way
console.log('A comment before readFile instruction');
fs.readFile('./txt/start.txt', 'utf-8', (err, startData) => {
  if (err) return console.log('ERROR! 💥', err);
  const textOut = `This is the content of start.txt:\n${startData} \nLast modified: ${new Date().toLocaleString()}`;

  fs.writeFile('./txt/final.txt', textOut, 'utf-8', (err) => {
    if (err) return console.log('ERROR! 💥', err);
    console.log(`File written! Content: ${textOut}`);
  });
});
console.log('A comment after readFile instruction');
