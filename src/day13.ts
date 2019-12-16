import fs from "fs";
import IntCode from "./IntCode";

const program = fs
  .readFileSync("input/day13", "utf-8")
  .split(",")
  .map(i => parseInt(i, 10));
const compy = new IntCode(program);

const input: number[] = [];
const stepper = compy.execute(input);

let score = 0;
let ballX = 0;
let paddleX = 0;
while (true) {
  let x = stepper.next();
  if (x.done) {
    console.log(`score: ${score}`);
    break;
  }
  if (x.value === undefined) {
    //INPUT
    if (ballX > paddleX) {
      input.push(1);
    } else if (ballX < paddleX) {
      input.push(-1);
    } else {
      input.push(0);
    }
    x = stepper.next();
  }

  const y = stepper.next();
  const id = stepper.next();
  if (
    x.value === undefined ||
    y.done ||
    id.done ||
    y.value === undefined ||
    id.value === undefined
  ) {
    throw "unexpected output";
  }
  if (x.value === -1 && y.value === 0) {
    score = id.value;
  } else if (id.value === 3) {
    paddleX = x.value;
  } else if (id.value === 4) {
    ballX = x.value;
  }
}
