import fs from "fs";
import IntCode from "./IntCode";

const program = fs
  .readFileSync("input/day19", "utf-8")
  .split(",")
  .map(i => parseInt(i, 10));

const compy = new IntCode(program);

let affectedSquares = 0;
for (let y = 0; y < 50; y++) {
  for (let x = 0; x < 50; x++) {
    const stepper = compy.execute([x, y]);
    const pulled = stepper.next();
    if (pulled.done || pulled.value === undefined) {
      throw "HONK";
    }
    if (pulled.value === 1) {
      affectedSquares++;
    }
  }
}

console.log(affectedSquares);
