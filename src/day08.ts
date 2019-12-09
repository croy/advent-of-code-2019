import fs from 'fs';
import _ from 'lodash';

const digits = fs.readFileSync('input/day08', 'utf-8').split('').map(i => parseInt(i, 10));
const layers = _.chunk(digits, 25 * 6);
let minZeros = Infinity;
let currentVal = -1;

layers.forEach((layer) => {
  const counts = _.countBy(layer);
  if ((counts[0] ?? 0) < minZeros) {
    currentVal = counts[1] * counts[2];
    minZeros = counts[0] ?? 0;
  }
});
console.log(currentVal);

const pixels = _.zip(...layers).map(position => {
  for (const pixel of position) {
    if (pixel === 1) {
      return "X";
    }
    if (pixel === 0) {
      return " ";
    }
  }
});
_.chunk(pixels, 25).map(line => line.join("")).forEach(line => console.log(line));