import fs from 'fs';

const program = fs.readFileSync('input/day05', 'utf-8').split(',').map(i => parseInt(i, 10));
let instructionPointer = 0;

function getIntermediate(program: number[], address: number) {
  return program[program[address]];
}

function setIntermediate(program: number[], address: number, value: number) {
  program[program[address]] = value;
}

while (instructionPointer < program.length) {
  const instruction = program[instructionPointer];
  const opCode = instruction % 100;
  const arg1 = Math.floor(instruction / 100) % 10 === 1 ? program[instructionPointer + 1] : getIntermediate(program, instructionPointer + 1);
  const arg2 = (Math.floor(instruction / 1000) % 10 === 1 ? program[instructionPointer + 2] : getIntermediate(program, instructionPointer + 2));
  switch (opCode) {
    case 1:
      setIntermediate(
        program,
        instructionPointer + 3,
        arg1 + arg2,
      )
      instructionPointer += 4;
      break;
    case 2:
      setIntermediate(
        program,
        instructionPointer + 3,
        arg1 * arg2,
      )
      instructionPointer += 4;
      break;
    case 3:
      program[program[instructionPointer + 1]] = 5;
      instructionPointer += 2;
      break;
    case 4:
      console.log(arg1);
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
      setIntermediate(program, instructionPointer + 3, arg1 < arg2 ? 1 : 0);
      instructionPointer += 4;
      break;
    case 8:
      setIntermediate(program, instructionPointer + 3, arg1 === arg2 ? 1 : 0);
      instructionPointer += 4;
      break;
    case 99:
      console.log("HALT");
      instructionPointer = program.length;
      break;
    default:
      throw `UNKNOWN OPERATION ${instruction}`;
  }
}