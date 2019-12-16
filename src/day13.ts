import fs from 'fs';
import IntCode from './IntCode';

const program = fs.readFileSync('input/day13', 'utf-8').split(',').map(i => parseInt(i, 10));
const compy = new IntCode(program);

const stepper = compy.execute([]);

let blockCount = 0;

while (true) {
  const x = stepper.next();
  const y = stepper.next();
  const id = stepper.next();
  if (x.done) {
    break;
  }
  if (x.value === undefined || y.done || id.done || y.value === undefined || id.value === undefined) {
    throw 'unexpected output';
  }
  if (id.value === 3) {
    console.log(`(${x},${y})`);
  }
  if (id.value === 2) {
    blockCount++;
  }
}

console.log(blockCount);