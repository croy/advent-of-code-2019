import fs from "fs";

function part1() {
  function calculateFuelCost(moduleWeight: number): number {
    return Math.floor(moduleWeight / 3) - 2;
  }

  const inFile = fs.readFileSync("input/day1", "utf-8");
  const result = inFile
    .split("\n")
    .map(n => parseInt(n))
    .map(calculateFuelCost)
    .reduce((n, c) => n + c);

  console.log(result);
}

function part2() {
  function calculateFuelCost(weight: number): number {
    const fuelCost = Math.floor(weight / 3) - 2;
    if (fuelCost <= 0) {
      return 0;
    }
    return fuelCost + calculateFuelCost(fuelCost);
  }

  const inFile = fs.readFileSync("input/day1", "utf-8");
  const result = inFile
    .split("\n")
    .map(n => parseInt(n))
    .map(calculateFuelCost)
    .reduce((n, c) => n + c);

  console.log(result);
}

part1();
part2();
