import fs from "fs";

function part1() {
  console.log(simulateIntCode(12, 2));
}

function part2() {
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      if (simulateIntCode(i, j) === 19690720) {
        console.log(100 * i + j);
        return;
      }
    }
  }
}

function simulateIntCode(input1?: number, input2?: number) {
  const input = fs.readFileSync("input/day2", "utf-8");
  const memory = input.split(",").map(n => parseInt(n));
  if (input1) {
    memory[1] = input1;
  }
  if (input2) {
    memory[2] = input2;
  }
  let idx = 0;
  while (idx < memory.length) {
    const opCode = memory[idx];
    if (opCode === 99) {
      return memory[0];
    } else if (opCode === 1) {
      memory[memory[idx + 3]] =
        memory[memory[idx + 1]] + memory[memory[idx + 2]];
      idx += 4;
    } else if (opCode === 2) {
      memory[memory[idx + 3]] =
        memory[memory[idx + 1]] * memory[memory[idx + 2]];
      idx += 4;
    }
  }
  throw "ran out of instructions";
}

part1();
part2();
