import fs from "fs";
import _ from "lodash";

class Moon {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.dx = 0;
    this.dy = 0;
    this.dz = 0;
  }

  potentialEnergy() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  kineticEnergy() {
    return Math.abs(this.dx) + Math.abs(this.dy) + Math.abs(this.dz);
  }

  energy() {
    return this.potentialEnergy() * this.kineticEnergy();
  }

  applyGravity(otherMoon: Moon) {
    if (otherMoon.x > this.x) {
      this.dx++;
      otherMoon.dx--;
    } else if (otherMoon.x < this.x) {
      this.dx--;
      otherMoon.dx++;
    }
    if (otherMoon.y > this.y) {
      this.dy++;
      otherMoon.dy--;
    } else if (otherMoon.y < this.y) {
      this.dy--;
      otherMoon.dy++;
    }
    if (otherMoon.z > this.z) {
      this.dz++;
      otherMoon.dz--;
    } else if (otherMoon.z < this.z) {
      this.dz--;
      otherMoon.dz++;
    }
  }

  tick() {
    this.x += this.dx;
    this.y += this.dy;
    this.z += this.dz;
  }

  static parse(moonDescription: string) {
    const moonRegex = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;
    const matches = moonRegex.exec(moonDescription);
    if (!matches) {
      throw `invalid description ${moonDescription}`;
    }
    return new Moon(
      parseInt(matches[1]),
      parseInt(matches[2]),
      parseInt(matches[3])
    );
  }
}

const moons = fs
  .readFileSync("input/day12", "utf-8")
  .split("\n")
  .map(Moon.parse);

const SIMULATION_STEPS = 1000;

for (let step = 0; step < SIMULATION_STEPS; step++) {
  for (let i = 0; i < moons.length; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      moons[i].applyGravity(moons[j]);
    }
  }
  for (const m of moons) {
    m.tick();
  }
}

console.log(moons);

console.log(
  _.chain(moons)
    .map(m => m.energy())
    .sum()
    .value()
);

// Part 2
const part2Moons = fs
  .readFileSync("input/day12", "utf-8")
  .split("\n")
  .map(Moon.parse);

const previousXStates: { [key: string]: number } = {};
const previousYStates: { [key: string]: number } = {};
const previousZStates: { [key: string]: number } = {};
let xLoop = -1;
let yLoop = -1;
let zLoop = -1;
let xLoopStart = -1;
let yLoopStart = -1;
let zLoopStart = -1;
let step = 0;

while (xLoop < 0 || yLoop < 0 || zLoop < 0) {
  const xState = `${part2Moons[0].x}, ${part2Moons[0].dx}; ${part2Moons[1].x}, ${part2Moons[1].dx}; ${part2Moons[2].x}, ${part2Moons[2].dx}; ${part2Moons[3].x}, ${part2Moons[3].dx}`;
  const yState = `${part2Moons[0].y}, ${part2Moons[0].dy}; ${part2Moons[1].y}, ${part2Moons[1].dy}; ${part2Moons[2].y}, ${part2Moons[2].dy}; ${part2Moons[3].y}, ${part2Moons[3].dy}`;
  const zState = `${part2Moons[0].z}, ${part2Moons[0].dz}; ${part2Moons[1].z}, ${part2Moons[1].dz}; ${part2Moons[2].z}, ${part2Moons[2].dz}; ${part2Moons[3].z}, ${part2Moons[3].dz}`;
  if (xLoop < 0 && xState in previousXStates) {
    xLoopStart = previousXStates[xState];
    xLoop = step - xLoopStart;
  } else {
    previousXStates[xState] = step;
  }
  if (yLoop < 0 && yState in previousYStates) {
    yLoopStart = previousYStates[yState];
    yLoop = step - yLoopStart;
  } else {
    previousYStates[yState] = step;
  }
  if (zLoop < 0 && zState in previousZStates) {
    zLoopStart = previousZStates[zState];
    zLoop = step - zLoopStart;
  } else {
    previousZStates[zState] = step;
  }
  part2Moons[0].applyGravity(part2Moons[1]);
  part2Moons[0].applyGravity(part2Moons[2]);
  part2Moons[0].applyGravity(part2Moons[3]);
  part2Moons[1].applyGravity(part2Moons[2]);
  part2Moons[1].applyGravity(part2Moons[3]);
  part2Moons[2].applyGravity(part2Moons[3]);
  part2Moons[0].tick();
  part2Moons[1].tick();
  part2Moons[2].tick();
  part2Moons[3].tick();
  step++;
}

console.log(`x: ${xLoopStart}, cycle length: ${xLoop}`);
console.log(`y: ${yLoopStart}, cycle length: ${yLoop}`);
console.log(`z: ${zLoopStart}, cycle length: ${zLoop}`);
