import { readInputLines } from "../utils/fileUtils.mjs";


const inputLines = await readInputLines();

let count = 0;

for (let y = 0; y < inputLines.length; y++) {
    const line = inputLines[y];
    for (let x = 0; x < line.length; x++) {
        const c = line[x];

        if (c === "X") {
            if (line[x] + line[x+1] + line[x+2] + line[x+3] === "XMAS") count++;
            if (line[x] + line[x-1] + line[x-2] + line[x-3] === "XMAS") count++;
            if (line[x] + (inputLines[y+1] || [])[x] + (inputLines[y+2] || [])[x] + (inputLines[y+3] || [])[x] === "XMAS") count++;
            if (line[x] + (inputLines[y-1] || [])[x] + (inputLines[y-2] || [])[x] + (inputLines[y-3] || [])[x] === "XMAS") count++;
            if (line[x] + (inputLines[y+1] || [])[x+1] + (inputLines[y+2] || [])[x+2] + (inputLines[y+3] || [])[x+3] === "XMAS") count++;
            if (line[x] + (inputLines[y+1] || [])[x-1] + (inputLines[y+2] || [])[x-2] + (inputLines[y+3] || [])[x-3] === "XMAS") count++;
            if (line[x] + (inputLines[y-1] || [])[x+1] + (inputLines[y-2] || [])[x+2] + (inputLines[y-3] || [])[x+3] === "XMAS") count++;
            if (line[x] + (inputLines[y-1] || [])[x-1] + (inputLines[y-2] || [])[x-2] + (inputLines[y-3] || [])[x-3] === "XMAS") count++;
        }
    }
}


console.log(count)