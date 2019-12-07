import fs from 'fs';

class IntCode {
  program: number[];

  constructor(program: number[]) {
    this.program = program;
  }

  *execute(inputs: number[]) {
    const memory = [... this.program];

    function getDirect(address: number) {
      return memory[address];
    }
    function getIntermediate(address: number) {
      return memory[memory[address]];
    }
    function setIntermediate(address: number, value: number) {
      memory[memory[address]] = value;
    }

    let instructionPointer = 0;
    while (instructionPointer < memory.length) {
      const instruction = memory[instructionPointer];
      const opCode = instruction % 100;
      const arg1 = Math.floor(instruction / 100) % 10 === 1 ? getDirect(instructionPointer + 1) : getIntermediate(instructionPointer + 1);
      const arg2 = (Math.floor(instruction / 1000) % 10 === 1 ? getDirect(instructionPointer + 2) : getIntermediate(instructionPointer + 2));
      switch (opCode) {
        case 1:
          setIntermediate(
            instructionPointer + 3,
            arg1 + arg2,
          )
          instructionPointer += 4;
          break;
        case 2:
          setIntermediate(
            instructionPointer + 3,
            arg1 * arg2,
          )
          instructionPointer += 4;
          break;
        case 3:
          while (inputs.length === 0) {
            yield;
          }
          setIntermediate(instructionPointer + 1, inputs.shift() as number);
          instructionPointer += 2;
          break;
        case 4:
          yield arg1;
          instructionPointer += 2;
          break;
        case 5:
          if (arg1 !== 0) {
            instructionPointer = arg2;
          } else {
            instructionPointer += 3;
          }
          break;
        case 6:
          if (arg1 === 0) {
            instructionPointer = arg2;
          } else {
            instructionPointer += 3;
          }
          break;
        case 7:
          setIntermediate(instructionPointer + 3, arg1 < arg2 ? 1 : 0);
          instructionPointer += 4;
          break;
        case 8:
          setIntermediate(instructionPointer + 3, arg1 === arg2 ? 1 : 0);
          instructionPointer += 4;
          break;
        case 99:
          return;
        default:
          throw `UNKNOWN OPERATION ${instruction}`;
      }
    }
    throw 'y no halt';
  }
}

function permutations(options: number[]): number[][] {
  if (options.length === 1) {
    return [options];
  }
  return options.flatMap(opt => permutations(options.filter(x => x !== opt)).map(perms => [opt, ...perms]));
}

const possiblePhaseOrders = permutations([5, 6, 7, 8, 9]);

const program = fs.readFileSync('input/day7', 'utf-8');
const compy = new IntCode(program.split(',').map(i => parseInt(i, 10)));
let max = -Infinity;
for (const phaseOrder of possiblePhaseOrders) {
  const inputA = [phaseOrder[0], 0];
  const inputB = [phaseOrder[1]]
  const inputC = [phaseOrder[2]]
  const inputD = [phaseOrder[3]]
  const inputE = [phaseOrder[4]]
  const outputA = compy.execute(inputA);
  const outputB = compy.execute(inputB);
  const outputC = compy.execute(inputC);
  const outputD = compy.execute(inputD);
  const outputE = compy.execute(inputE);
  let finished = false;
  while (!finished) {
    let lastYield = outputA.next();
    while (!lastYield.done && lastYield.value !== undefined) {
      inputB.push(lastYield.value);
      lastYield = outputA.next();
    }
    lastYield = outputB.next();
    while (!lastYield.done && lastYield.value !== undefined) {
      inputC.push(lastYield.value);
      lastYield = outputB.next();
    }
    lastYield = outputC.next();
    while (!lastYield.done && lastYield.value !== undefined) {
      inputD.push(lastYield.value);
      lastYield = outputC.next();
    }
    lastYield = outputD.next();
    while (!lastYield.done && lastYield.value !== undefined) {
      inputE.push(lastYield.value);
      lastYield = outputD.next();
    }
    lastYield = outputE.next();
    while (!lastYield.done && lastYield.value !== undefined) {
      if (lastYield.value > max) {
        max = lastYield.value;
      }
      inputA.push(lastYield.value);
      lastYield = outputE.next();
    }
    finished = lastYield.done as boolean;
  }
}

console.log(max);