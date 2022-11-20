import * as fs from 'fs';
import { Mutex } from 'await-semaphore';
const mutex = new Mutex();
const fileName: string = 'ranking.json';

export async function addRanking(date: string, name: string, score: number) {
  const key = name + date;
  mutex.use(async () => {
    let fileContent = fs.readFileSync(fileName, 'utf8');
    console.log(fileContent);
    JSON.stringify({key: [name, date, score]});
  });
}