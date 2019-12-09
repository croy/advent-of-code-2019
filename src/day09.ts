import fs from 'fs';
import IntCode from './IntCode';


const program = fs.readFileSync('input/day09', 'utf-8').split(',').map(i => parseInt(i, 10));
const compy = new IntCode(program);

for (const v of compy.execute([1])) {
  console.log(v);
}

for (const v of compy.execute([2])) {
  console.log(v);
}