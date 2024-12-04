import { readInputText } from "../utils/fileUtils.mjs";

const input = await readInputText();


const mul = (l, r) => l * r;

//const matches = /mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)/g.exec(input);
const r = /(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;
const innerRegex = /\d{1,3}/g

const matches = input.matchAll(r);
const m = [...matches]

let total = 0;
let enabled = true;

m.forEach(match => {
    if (match[1] === "do()") enabled = true;
    else if (match[1] === "don't()") enabled = false;
    else if (enabled) total += mul(match[2], match[3])
})

//const d = m.find(item => item[0].startsWith("mul"))
//console.log(d)
console.log(total)