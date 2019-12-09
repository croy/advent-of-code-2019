import fs from 'fs';

const orbitPairs = fs.readFileSync('input/day06', 'utf-8').split('\n').map(l => l.split(')'));

type Node = {
  name: string,
  directOrbiters: string[],
  parent?: string,
}

const nodeMap: { [key: string]: Node } = {};

orbitPairs.forEach(([object1, orbiter]) => {
  if (nodeMap[orbiter] === undefined) {
    nodeMap[orbiter] = { name: orbiter, directOrbiters: [], parent: object1 };

  } else {
    nodeMap[orbiter].parent = object1;
  }
  if (nodeMap[object1] === undefined) {
    nodeMap[object1] = { name: object1, directOrbiters: [orbiter] };
  } else {
    nodeMap[object1].directOrbiters.push(orbiter);
  }
});

function countOrbits(nodeName: string, depth: number): number {
  const node = nodeMap[nodeName];
  return depth + node.directOrbiters.map(orbiterName => countOrbits(orbiterName, depth + 1)).reduce((a, b) => a + b, 0)
}

console.log(countOrbits("COM", 0));

const parentDistanceFromSAN: { [key: string]: number } = {};
let currentNode: Node = nodeMap["SAN"];
let currentDistance = 0; //start at SAN's parent
while (currentNode.parent !== undefined) {
  currentNode = nodeMap[currentNode.parent];
  parentDistanceFromSAN[currentNode.name] = currentDistance;
  currentDistance++;
}

currentNode = nodeMap["YOU"];
currentDistance = 0;
while (currentNode.parent !== undefined) {
  currentNode = nodeMap[currentNode.parent];
  if (parentDistanceFromSAN[currentNode.name] !== undefined) {
    break;
  }
  currentDistance++;
}

console.log(currentDistance + parentDistanceFromSAN[currentNode.name]);