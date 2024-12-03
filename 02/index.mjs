import { readDelimitedInputData } from "../utils/fileUtils.mjs";



const lines = await readDelimitedInputData(" ");


const isPairSafe = (current, next, direction) => {
    const actualDir = next - current;
    if (actualDir === 0) return false;
    if (Math.abs(actualDir) > 3) return false;

    if (direction) {
        if (actualDir > 0 && direction < 0) return false;
        if (actualDir < 0 && direction > 0) return false;
    }

    return true;
}

const isSafe = (line) => {
    let direction;
    let maxDiff = 0

    for (let i = 0; i < line.length - 1; i++) {
        const current = parseInt(line[i])
        const next = parseInt(line[i+1])

        if (!isPairSafe(current, next, direction)) return false;
        
        if (!direction) direction = next - current;
    }


    console.log(line.join(" "), direction > 0 ? "up" : "down", maxDiff)
    return true;
}

const output = lines.filter(l => isSafe(l)).length

console.log(output)