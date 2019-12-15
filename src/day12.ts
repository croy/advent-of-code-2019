import fs from 'fs';
import _ from 'lodash';

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
    return new Moon(parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]));
  }
}

const moons = fs.readFileSync('input/day12', 'utf-8').split('\n').map(Moon.parse);

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

console.log(_.chain(moons).map(m => m.energy()).sum().value());