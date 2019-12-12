import fs, { stat } from 'fs';
import _ from 'lodash';


const inputGrid = fs.readFileSync('input/day10', 'utf-8').split('\n').map(line => line.split(''));

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

const points: XYPoint[] = [];

for (let y = 0; y < inputGrid.length; y++) {
  for (let x = 0; x < inputGrid[y].length; x++) {
    if (inputGrid[y][x] === '#') {
      points.push(new XYPoint(x, y));
    }
  }
}

const counts: { [key: string]: Set<number> } = {};

for (const p1 of points) {
  for (const p2 of points) {
    if (!(p1.toString() in counts)) {
      counts[p1.toString()] = new Set();
    }
    if (p1.x !== p2.x || p1.y !== p2.y) {
      counts[p1.toString()].add(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI);
    }
  }
}

const result = _.chain(counts).map((v, k) => [v.size, k]).sortBy().last().value();
console.log(result);


const stationLocation = new XYPoint(31, 20);
const asteroidsWithAngles: {
  x: number,
  y: number,
  distance: number,
  angle: number,
}[] = [];

for (const asteroid of points) {
  if (asteroid.x !== stationLocation.x || asteroid.y !== stationLocation.y) {
    const angle = Math.atan2(stationLocation.y - asteroid.y, asteroid.x - stationLocation.x) * 180 / Math.PI;
    asteroidsWithAngles.push({
      x: asteroid.x,
      y: asteroid.y,
      distance: Math.sqrt(((asteroid.x - stationLocation.x) ** 2) + ((asteroid.y - stationLocation.y) ** 2)),
      angle,
    })
  }
}

const sortedAsteroids = _.sortBy(asteroidsWithAngles, p => p.angle * -1, 'distance');

while (sortedAsteroids[0].angle > 90) {
  sortedAsteroids.push(sortedAsteroids.shift() as any);
}

let count = 0;
while (count < 200) {
  const current = sortedAsteroids.shift();
  count++;
  while (sortedAsteroids[0].angle === current?.angle) {
    sortedAsteroids.push(sortedAsteroids.shift() as any);
  }
  if (count === 200) {
    console.log(current);
  }
}
