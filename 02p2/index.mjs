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
    let skipped = false;
    let skippedI = 0;

    for (let i = 0; i < line.length - 1; i++) {
        const current = parseInt(line[i]);
        let next = parseInt(line[i+1]);
        if (!isPairSafe(current, next, direction)) {
            if (skipped){
                console.log(line.join(" "), direction > 0 ? "up" : "down", "skipped " + skippedI, "already skipped");
                return false;
            }
            if (i + 2 >= line.length) {
                
                return true; // this is safe because last item
            }

            let next = parseInt(line[i+2]);
            skipped = true;
            skippedI = i;
            if (!isPairSafe(current, next, direction)) {
                if (i === 0) {
                    continue; // we can skip the first one
                }

                console.log(line.join(" "), direction > 0 ? "up" : "down", "skipped " + skippedI, "second value still out of range");
                return false;
            }
        }
        
        if (!direction) direction = next - current;
    }


    //console.log(line.join(" "), direction > 0 ? "up" : "down", "skipped " + skippedI);
    return true;
}

const output = lines.filter(l => isSafe(l)).length

console.log(output)