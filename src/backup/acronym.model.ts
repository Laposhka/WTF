import { readFileSync } from 'fs';
import { IAcronym } from 'interfaces/acronym.interface';
import AcronymModel from '@/models/acronym.model';
const { DB_FILE_URL } = require('../config');

export const readJSON = () => {
  const allData: IAcronym[] = [];
  const rawJson = readFileSync(DB_FILE_URL);
  const content: Array<Object> = JSON.parse(String(rawJson));

  console.log(process.cwd());
  content.forEach(async element => {
    const key = Object.keys(element)[0];
    const newData = {
      acronym: key,
      definition: element[key],
    };
    allData.push(newData);
    const newAcronym = new AcronymModel(newData);
    await newAcronym.save();
  });
  return allData;
};
