import fs from "fs";
import IntCode from "./IntCode";

const program = fs
  .readFileSync("input/day19", "utf-8")
  .split(",")
  .map(i => parseInt(i, 10));

const compy = new IntCode(program);

function squareAffected(x: number, y: number) {
  const stepper = compy.execute([x, y]);
  const pulled = stepper.next();
  if (pulled.done || pulled.value === undefined) {
    throw "HONK";
  }
  return pulled.value === 1;
}

const grid: string[][] = [];

let affectedSquares = 0;
for (let y = 0; y < 50; y++) {
  grid[y] = [];
  for (let x = 0; x < 50; x++) {
    if (squareAffected(x, y)) {
      grid[y][x] = "#";
      affectedSquares++;
    } else {
      grid[y][x] = ".";
    }
  }
}

console.log(affectedSquares);
console.log(grid.map(x => x.join("")));

function search() {
  let y = 15;
  let x = 0;
  let startX = 0;
  while (true) {
    y++;
    x = startX;
    while (!squareAffected(x, y)) {
      x++;
    }
    startX = x;
    while (squareAffected(x + 99, y)) {
      if (squareAffected(x, y + 99)) {
        return `${x},${y}`;
      }
      x++;
    }
  }
}

console.log(search());
