import fs from "fs";
import _ from "lodash";

const initialState = fs
  .readFileSync("input/day24", "utf-8")
  .split("\n")
  .map(s => s.split(""));

function repr(grid: string[][]): string {
  return grid.map(line => line.join("")).join("\n");
}

function adjacentBugs(grid: string[][], y: number, x: number): number {
  let result = 0;
  if (_.get(grid, [y - 1, x]) === "#") {
    result++;
  }
  if (_.get(grid, [y + 1, x]) === "#") {
    result++;
  }
  if (_.get(grid, [y, x - 1]) === "#") {
    result++;
  }
  if (_.get(grid, [y, x + 1]) === "#") {
    result++;
  }
  return result;
}

function tick(grid: string[][]): string[][] {
  const res = _.cloneDeep(grid);
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const adjacent = adjacentBugs(grid, y, x);
      if (grid[y][x] === "#" && adjacent !== 1) {
        res[y][x] = ".";
      } else if (grid[y][x] === "." && (adjacent === 1 || adjacent === 2)) {
        res[y][x] = "#";
      }
    }
  }
  return res;
}

let currentState = _.cloneDeep(initialState);
let currentStringRep = repr(currentState);
const seen = new Set();
while (!seen.has(currentStringRep)) {
  seen.add(currentStringRep);
  currentState = tick(currentState);
  currentStringRep = repr(currentState);
}

_.chain(currentState)
  .flatten()
  .map((v, i) => 2 ** i * (v === "#" ? 1 : 0))
  .sum()
  .tap(console.log)
  .value();
