import fs from 'fs';
import IntCode from './IntCode';
import _ from 'lodash';

type DIRECTION = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
const leftTurns: { [k in DIRECTION]: DIRECTION } = {
  'UP': 'LEFT',
  'LEFT': 'DOWN',
  'DOWN': 'RIGHT',
  'RIGHT': 'UP',
};
const rightTurns: { [k in DIRECTION]: DIRECTION } = {
  'UP': 'RIGHT',
  'RIGHT': 'DOWN',
  'DOWN': 'LEFT',
  'LEFT': 'UP'
}

const dx: { [k in DIRECTION]: number } = {
  'RIGHT': 1,
  'LEFT': -1,
  'UP': 0,
  'DOWN': 0,
}

const dy: { [k in DIRECTION]: number } = {
  'RIGHT': 0,
  'LEFT': 0,
  'UP': -1,
  'DOWN': 1,
}

function rotate(turn: number, dir: DIRECTION): DIRECTION {
  if (turn === 0) {
    return leftTurns[dir];
  } else if (turn === 1) {
    return rightTurns[dir];
  }
  throw 'INVALID TURN';
}

const program = fs.readFileSync('input/day11', 'utf-8').split(',').map(i => parseInt(i, 10));

const inputStream: number[] = [];
let stepper = new IntCode(program).execute(inputStream);
let currentX = 0;
let currentY = 0;
let currentDirection: DIRECTION = 'UP';
const hull: number[][] = [[1]];
const paintedPlaces = new Set();
while (true) {
  if (!hull[currentY]) {
    hull[currentY] = [];
  }
  const currentColor = _.get(hull, [currentY, currentX], 0);
  //provide current color
  inputStream.push(currentColor);

  //paint color
  const color = stepper.next();
  if (color.done) {
    break;
  }
  if (color.value === undefined) {
    throw 'received undefined color output';
  }
  hull[currentY][currentX] = color.value;
  paintedPlaces.add(`(${currentX},${currentY})`);

  //advance
  const turn = stepper.next();
  if (turn.done) {
    throw 'turn step should never be halt signal';
  }
  if (turn.value === undefined) {
    throw 'turn must be defined';
  }
  currentDirection = rotate(turn.value, currentDirection);
  currentX += dx[currentDirection];
  currentY += dy[currentDirection];
}

//console.log(paintedPlaces.size);
for (let y = 0; y < hull.length; y++) {
  const line: string[] = [];
  for (let x = 0; x < hull[y].length; x++) {
    if (hull[y][x] === 1) {
      line.push('X');
    } else {
      line.push(' ');
    }
  }
  console.log(line.join(''));
}