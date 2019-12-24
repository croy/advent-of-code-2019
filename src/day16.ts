import _ from "lodash";
const input =
  "59782619540402316074783022180346847593683757122943307667976220344797950034514416918778776585040527955353805734321825495534399127207245390950629733658814914072657145711801385002282630494752854444244301169223921275844497892361271504096167480707096198155369207586705067956112600088460634830206233130995298022405587358756907593027694240400890003211841796487770173357003673931768403098808243977129249867076581200289745279553289300165042557391962340424462139799923966162395369050372874851854914571896058891964384077773019120993386024960845623120768409036628948085303152029722788889436708810209513982988162590896085150414396795104755977641352501522955134675";

const pattern = [0, 1, 0, -1];
let result = input.split("").map(i => parseInt(i, 10));
for (let phase = 0; phase < 100; phase++) {
  result = result.map(
    (i, outputIdx) =>
      Math.abs(
        result
          .map(
            (k, idx) => pattern[Math.floor((idx + 1) / (outputIdx + 1)) % 4] * k
          )
          .reduce((a, b) => a + b, 0)
      ) % 10
  );
}

// part 1
console.log(
  _.chain(result)
    .take(8)
    .join("")
    .value()
);

// part 2
// since our offset pushes us beyond the halfway point, we only have sums to deal with.

const offset = parseInt(input.substr(0, 7));
const totalLength = input.length * 10000;
const relevantLength = totalLength - offset;
const part2Input = _.takeRight(
  input
    .repeat(10000)
    .split("")
    .map(i => parseInt(i, 10)),
  relevantLength
);

for (let repeat = 0; repeat < 100; repeat++) {
  for (let index = part2Input.length - 2; index >= 0; index--) {
    part2Input[index] = (part2Input[index] + part2Input[index + 1]) % 10;
  }
}
console.log(
  _.chain(part2Input)
    .take(8)
    .join("")
    .value()
);
