import fs from "fs";

type Chemical = {
  name: string;
  count: number;
};

type Reaction = {
  output: Chemical;
  inputs: Chemical[];
};

const reactionMap: { [key: string]: Reaction } = {};

function parseChemical(chemicalText: string): Chemical {
  const fields = chemicalText.trim().split(" ");
  return {
    name: fields[1],
    count: parseInt(fields[0])
  };
}

fs.readFileSync("input/day14", "utf-8")
  .split("\n")
  .forEach(line => {
    const [inputText, outputText] = line.split("=>");
    const inputs = inputText.split(",").map(parseChemical);
    const output = parseChemical(outputText);
    reactionMap[output.name] = {
      output,
      inputs
    };
  });

const chemicalStore: { [key: string]: number } = {};
const LIMIT = 1000000000000;
const overestimeOfFuelCost = 378929;
const productionQueue: Chemical[] = [
  { name: "FUEL", count: Math.floor(LIMIT / overestimeOfFuelCost) }
];
let oreConsumed = 0;
let fuelProduced = 0;
while (oreConsumed <= LIMIT) {
  while (productionQueue.length > 0) {
    const nextProduct = productionQueue.pop() as Chemical;
    if (nextProduct.name === "ORE") {
      oreConsumed += nextProduct.count;
    } else {
      if (!(nextProduct.name in chemicalStore)) {
        chemicalStore[nextProduct.name] = 0;
      }
      if (nextProduct.count <= chemicalStore[nextProduct.name]) {
        chemicalStore[nextProduct.name] -= nextProduct.count;
      } else {
        //use up stores
        const neededCount = nextProduct.count - chemicalStore[nextProduct.name];
        chemicalStore[nextProduct.name] = 0;
        if (neededCount > 0) {
          const reaction = reactionMap[nextProduct.name];
          const reactionsRequired = Math.ceil(
            neededCount / reaction.output.count
          );
          const amountCreated = reactionsRequired * reaction.output.count;
          chemicalStore[nextProduct.name] = amountCreated - neededCount;
          reaction.inputs.forEach(input => {
            productionQueue.push({
              name: input.name,
              count: input.count * reactionsRequired
            });
          });
        }
      }
    }
  }
  productionQueue.push({ name: "FUEL", count: 1 });
  fuelProduced++;
}
console.log(Math.floor(LIMIT / overestimeOfFuelCost) + fuelProduced - 2);
