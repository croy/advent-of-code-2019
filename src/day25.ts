import fs from "fs";
import IntCode from "./IntCode";
import stdio from "stdio";

async function main() {
  const program = fs
    .readFileSync("input/day25", "utf-8")
    .split(",")
    .map(i => parseInt(i));

  const compy = new IntCode(program);
  const input: number[] = [];
  const stepper = compy.execute(input);
  let prevStep = stepper.next();
  while (!prevStep.done) {
    if (prevStep.value === undefined) {
      const result = await stdio.ask("");
      for (const c of result) {
        input.push(c.codePointAt(0) as number);
      }
      input.push(10);
    } else {
      process.stdout.write(String.fromCharCode(prevStep.value));
    }
    prevStep = stepper.next();
  }
}

main();
