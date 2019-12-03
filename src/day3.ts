import fs from 'fs';

type Direction = 'U' | 'D' | 'R' | 'L'

type Instruction = {
  direction: Direction,
  distance: number,
}

class XYPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x},${this.y})`;
  }
}

function* traversePath(pathInstructions: Instruction[]) {
  const moveX = {
    'U': 0,
    'D': 0,
    'R': 1,
    'L': -1,
  }

  const moveY = {
    'U': 1,
    'D': -1,
    'R': 0,
    'L': 0,
  }

  let currX = 0;
  let currY = 0;
  for (const instruction of pathInstructions) {
    const dx = moveX[instruction.direction];
    const dy = moveY[instruction.direction];
    for (let i = 0; i < instruction.distance; i++) {
      currX += dx;
      currY += dy;
      yield new XYPoint(currX, currY);
    }
  };
}

function parseInstruction(instruction: string): Instruction {
  const matches = /^([UDRL])(\d+)$/.exec(instruction);
  if (!matches) {
    throw `INVALID INSTRUCTION ${instruction}`;
  }
  return {
    direction: matches[1] as Direction,
    distance: parseInt(matches[2]),
  };
}

const inputText = fs.readFileSync('input/day3', 'utf-8');
const wire1Instructions = inputText.split('\n')[0].split(',').map(parseInstruction);
const wire2Instructions = inputText.split('\n')[1].split(',').map(parseInstruction);

function part1() {
  const wire1Locations = new Set();
  for (const point of traversePath(wire1Instructions)) {
    wire1Locations.add(point.toString());
  }

  let currentMinDistance = Infinity;
  for (const point of traversePath(wire2Instructions)) {
    if (wire1Locations.has(point.toString())) {
      currentMinDistance = Math.min(currentMinDistance, Math.abs(point.x) + Math.abs(point.y));
    }
  }
  console.log(currentMinDistance);
}

function part2() {
  const wire1TravelLength: { [key: string]: number } = {}
  let travelLength = 1;
  for (const point of traversePath(wire1Instructions)) {
    wire1TravelLength[point.toString()] = wire1TravelLength[point.toString()] || travelLength;
    travelLength++;
  }

  travelLength = 1;
  let currentMinTravelLength = Infinity;
  for (const point of traversePath(wire2Instructions)) {
    if (wire1TravelLength[point.toString()]) {
      currentMinTravelLength = Math.min(currentMinTravelLength, travelLength + wire1TravelLength[point.toString()]);
    }
    travelLength++;
  }
  console.log(currentMinTravelLength);
}

part1();
part2();