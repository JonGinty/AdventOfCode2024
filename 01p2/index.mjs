import { readDelimitedInputData } from "../utils/fileUtils.mjs"


const lines = await readDelimitedInputData("   ")

const left = [];
const right = [];

lines.forEach(l => {
    left.push(parseInt(l[0]))
    right.push(parseInt(l[1]))
})

let total = 0;

left.forEach(n => {
    const occurrence = right.filter(r => r === n).length;
    //console.log({n, occurrence});
    total += n * occurrence;
})


console.log(total)