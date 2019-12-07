import fs from 'fs';

class IntCode {
  program: number[];

  constructor(program: number[]) {
    this.program = program;
  }

  execute(inputs: number[]): number {
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
          setIntermediate(instructionPointer + 1, inputs.shift() ?? 0);
          instructionPointer += 2;
          break;
        case 4:
          return arg1;
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
          throw 'should have output a value!'
        default:
          throw `UNKNOWN OPERATION ${instruction}`;
      }
    }
    throw 'should have output a value!'
  }
}

function permutations(options: number[]): number[][] {
  if (options.length === 1) {
    return [options];
  }
  return options.flatMap(opt => permutations(options.filter(x => x !== opt)).map(perms => [opt, ...perms]));
}

const possiblePhaseOrders = permutations([0, 1, 2, 3, 4]);
const program = fs.readFileSync('input/day7', 'utf-8');
const compy = new IntCode(program.split(',').map(i => parseInt(i, 10)));
let max = -Infinity;
for (const phaseOrder of possiblePhaseOrders) {
  const phase1 = compy.execute([phaseOrder[0], 0]);
  const phase2 = compy.execute([phaseOrder[1], phase1]);
  const phase3 = compy.execute([phaseOrder[2], phase2]);
  const phase4 = compy.execute([phaseOrder[3], phase3]);
  const phase5 = compy.execute([phaseOrder[4], phase4]);
  if (phase5 > max) {
    max = phase5;
  }
}
console.log(max);