import IntCode from "./IntCode";
import fs from "fs";

enum Directions {
  North = 1,
  South = 2,
  West = 3,
  East = 4
}

const program = fs
  .readFileSync("input/day15", "utf-8")
  .split(",")
  .map(i => parseInt(i));

const robot = new IntCode(program);
const input: number[] = [];
const stepper = robot.execute(input);

const directionPairs: [Directions, Directions][] = [
  [Directions.North, Directions.South],
  [Directions.South, Directions.North],
  [Directions.East, Directions.West],
  [Directions.West, Directions.East]
];

//assume only one valid path to each point
function explore(pastMovements: number[], cameFrom?: Directions): number {
  for (const [direction, undo] of directionPairs) {
    if (cameFrom !== direction) {
      input.push(direction);
      const movementResult = stepper.next();
      if (movementResult.done || movementResult.value === undefined) {
        throw "something busted";
      }
      if (movementResult.value === 2) {
        return pastMovements.length + 1;
      } else if (movementResult.value === 1) {
        pastMovements.push(direction);
        const exploreResult = explore(pastMovements, undo);
        if (exploreResult > 0) {
          return exploreResult;
        }
        pastMovements.pop();
        input.push(undo);
        stepper.next();
      }
    }
  }
  return -1;
}

console.log(explore([]));
//at this point, we are at the oxygen tank.
