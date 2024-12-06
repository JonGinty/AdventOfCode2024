import { readInputLines } from "../utils/fileUtils.mjs";
import { Grid } from "../utils/gridutils.mjs";

const input = await readInputLines();

const grid = new Grid();


grid.loadLines(input);




const findGuard = (g) => {
    const coords = g.find("^") || g.find(">") || g.find("<") || g.find("v")
    return coords;
}

let currentGuardCoords = findGuard(grid);
let stepsVisited = 0;

const nextStep = (g, guardCoords) => {
    const guard = g.get(guardCoords.x, guardCoords.y);
    const nextCoords = {...guardCoords}
    switch (guard) {
        case "^":
            nextCoords.y = guardCoords.y - 1;
            break;
        case ">":
             nextCoords.x = guardCoords.x + 1;
             break;
        case "<": 
            nextCoords.x = guardCoords.x - 1;
            break;
        case "v":
            nextCoords.y = guardCoords.y + 1;
            break;
        default:
            throw "aaaaaargh: " + guard;
    }

    return nextCoords;
}

const rotateGuard = (guard) => {
    switch (guard) {
        case "^": return ">"
        case ">": return "v"
        case "<": return "^"
        case "v": return "<"
        default:
            throw "oh no!: " + guard;
    }
}

while (true) {
    const next = nextStep(grid, currentGuardCoords);
    if (!grid.isInRange(next.x, next.y)) break;
    const nextItem = grid.get(next.x, next.y);
    const g = grid.get(currentGuardCoords.x, currentGuardCoords.y);
    if (nextItem !== "#") {
        if (nextItem !== "X") stepsVisited++;
        grid.set(currentGuardCoords.x, currentGuardCoords.y, "X");
        currentGuardCoords = next;
        grid.set(currentGuardCoords.x, currentGuardCoords.y, g);
    } else {
        grid.set(currentGuardCoords.x, currentGuardCoords.y, rotateGuard(g))
    }
    // console.log(grid.toString())
    // console.log()
}




const coords = findGuard(grid)
const next = nextStep(grid, coords);
console.log(grid.toString());

console.log(grid.determineRange())
console.log("coords", coords)
console.log("item", grid.get(coords.x, coords.y))
console.log("next", next)
console.log("visited", stepsVisited + 1)
