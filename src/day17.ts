import fs from "fs";
import IntCode from "./IntCode";

const intcodeProgram = fs
  .readFileSync("input/day17", "utf-8")
  .split(",")
  .map(i => parseInt(i));

const compy = new IntCode(intcodeProgram);
const output = [...compy.execute([])] as number[];
const grid = String.fromCharCode(...output)
  .split("\n")
  .map(x => x.split(""));

function isScaffold(x: number, y: number) {
  return (
    y >= 0 &&
    y < grid.length &&
    x >= 0 &&
    x < grid[y].length &&
    grid[y][x] === "#"
  );
}

let alignmentSum = 0;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (
      isScaffold(x, y) &&
      isScaffold(x - 1, y) &&
      isScaffold(x + 1, y) &&
      isScaffold(x, y - 1) &&
      isScaffold(x, y + 1)
    ) {
      alignmentSum += x * y;
    }
  }
}

console.log(alignmentSum);
