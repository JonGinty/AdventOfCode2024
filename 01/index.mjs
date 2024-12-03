import { readDelimitedInputData } from "../utils/fileUtils.mjs"


const lines = await readDelimitedInputData("   ")

const left = [];
const right = [];

lines.forEach(l => {
    left.push(parseInt(l[0]))
    right.push(parseInt(l[1]))
})

const zip = function(l, r) {
    return l.map((item, index) => {
        return {l: item, r: r[index]}
    })
}

left.sort();
right.sort();

const output = zip(left, right);

let total = 0;
output.forEach(pair => total += Math.abs(pair.l - pair.r))

console.log(total)