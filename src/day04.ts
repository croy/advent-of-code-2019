import _ from "lodash";

function getDigits(i: number): number[] {
  const result = [];
  let remainingNumber = i;
  while (remainingNumber > 0) {
    result.push(remainingNumber % 10);
    remainingNumber = Math.floor(remainingNumber / 10);
  }
  return _.reverse(result);
}

function isMonotonicallyIncreasing(digits: number[]) {
  for (let i = 1; i < digits.length; i++) {
    if (digits[i] < digits[i - 1]) {
      return false;
    }
  }
  return true;
}

function hasAtLeastDoubles(digits: number[]) {
  return _.chain(digits)
    .countBy()
    .values()
    .some(x => x >= 2)
    .value();
}

function hasExactlyDoubles(digits: number[]) {
  return _.chain(digits)
    .countBy()
    .values()
    .some(x => x === 2)
    .value();
}

function part1Met(i: number) {
  const digits = getDigits(i);
  return isMonotonicallyIncreasing(digits) && hasAtLeastDoubles(digits);
}

function part2Met(i: number): boolean {
  const digits = getDigits(i);
  return isMonotonicallyIncreasing(digits) && hasExactlyDoubles(digits);
}

const START = 138307;
const END = 654504;

const part1Count = _.range(START, END).filter(part1Met).length;
const part2Count = _.range(START, END).filter(part2Met).length;

console.log(part1Count);
console.log(part2Count);
