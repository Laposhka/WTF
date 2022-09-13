import { readFileSync } from 'fs';
import { Acronym } from 'interfaces/acronym.interface';
const { DB_FILE_URL } = require('../config');

const allData: Array<Acronym> = [];

try {
  const rawJson = readFileSync(DB_FILE_URL);
  const content: Array<Object> = JSON.parse(String(rawJson));

  // console.log(process.cwd())
  content.forEach(element => {
    const key = Object.keys(element)[0];
    allData.push({
      acronym: key,
      definition: element[key],
    });
  });
} catch (error) {
  console.log(error);
}

export default allData;
