import { readInputLines } from "../utils/fileUtils.mjs";


const inputLines = await readInputLines();

let count = 0;

for (let y = 0; y < inputLines.length; y++) {
    const line = inputLines[y];
    for (let x = 0; x < line.length; x++) {
        const c = line[x];

        if (c === "A") {
            const topLeft = (inputLines[y-1] || [])[x-1]
            const topRight = (inputLines[y-1] || [])[x+1]
            const bottomLeft = (inputLines[y+1] || [])[x-1]
            const bottomRight = (inputLines[y+1] || [])[x+1]
            
            const d1 = topLeft + bottomRight, d2 = bottomLeft + topRight;
            if ((d1 == "MS" || d1 == "SM") && (d2 == "MS" || d2 == "SM")) {
                count++;
            }
        }
    }
}


console.log(count)