enum Mode {
  position = 0,
  immediate = 1,
  relative = 2,
}

enum Operation {
  add = 1,
  multiply = 2,
  input = 3,
  output = 4,
  jnz = 5,
  jz = 6,
  less = 7,
  eq = 8,
  adjustBase = 9,
  halt = 99,

}

export default class IntCode {
  program: number[];

  constructor(program: number[]) {
    this.program = program;
  }

  *execute(inputs: number[]) {
    const memory = [... this.program].concat(new Array(1000).fill(0));
    let instructionPointer = 0;
    let relativeBase = 0;

    function get(argType: Mode, address: number): number {
      switch (argType) {
        case Mode.position:
          return memory[memory[address]];
        case Mode.immediate:
          return memory[address];
        case Mode.relative:
          return memory[memory[address] + relativeBase];
      }
    }

    function set(argType: number, address: number, value: number) {
      switch (argType) {
        case Mode.position:
          memory[memory[address]] = value;
          break;
        case Mode.immediate:
          throw 'NO';
        case Mode.relative:
          memory[memory[address] + relativeBase] = value;
          break;
      }
    }

    while (instructionPointer < memory.length) {
      const instruction = memory[instructionPointer];
      const opCode = instruction % 100;
      const arg1Type = Math.floor(instruction / 100) % 10;
      const arg2Type = Math.floor(instruction / 1000) % 10;
      const arg3Type = Math.floor(instruction / 10000) % 10;
      switch (opCode) {
        case Operation.add:
          set(arg3Type, instructionPointer + 3, get(arg1Type, instructionPointer + 1) + get(arg2Type, instructionPointer + 2));
          instructionPointer += 4;
          break;
        case Operation.multiply:
          set(arg3Type, instructionPointer + 3, get(arg1Type, instructionPointer + 1) * get(arg2Type, instructionPointer + 2));
          instructionPointer += 4;
          break;
        case Operation.input:
          while (inputs.length === 0) {
            yield;
          }
          set(arg1Type, instructionPointer + 1, inputs.shift() as number)
          instructionPointer += 2;
          break;
        case Operation.output:
          yield get(arg1Type, instructionPointer + 1);
          instructionPointer += 2;
          break;
        case Operation.jnz:
          if (get(arg1Type, instructionPointer + 1) !== 0) {
            instructionPointer = get(arg2Type, instructionPointer + 2);
          } else {
            instructionPointer += 3;
          }
          break;
        case Operation.jz:
          if (get(arg1Type, instructionPointer + 1) === 0) {
            instructionPointer = get(arg2Type, instructionPointer + 2);
          } else {
            instructionPointer += 3;
          }
          break;
        case Operation.less:
          set(arg3Type, instructionPointer + 3, get(arg1Type, instructionPointer + 1) < get(arg2Type, instructionPointer + 2) ? 1 : 0)
          instructionPointer += 4;
          break;
        case Operation.eq:
          set(arg3Type, instructionPointer + 3, get(arg1Type, instructionPointer + 1) === get(arg2Type, instructionPointer + 2) ? 1 : 0)
          instructionPointer += 4;
          break;
        case Operation.adjustBase:
          relativeBase += get(arg1Type, instructionPointer + 1);
          instructionPointer += 2;
          break;
        case Operation.halt:
          return;
        default:
          throw `UNKNOWN OPERATION ${instruction}`;
      }
    }
    throw 'y no halt';
  }
}