import { readInputText } from "../utils/fileUtils.mjs";

const input = await readInputText();


const mul = (l, r) => l * r;

//const matches = /mul\([0-9][0-9]?[0-9]?,[0-9][0-9]?[0-9]?\)/g.exec(input);
const r = /mul\((\d{1,3}),(\d{1,3})\)/g;
const innerRegex = /\d{1,3}/g

const matches = input.matchAll(r);
const m = [...matches]

let total = 0;

m.forEach(match => total += mul(match[1], match[2]))



console.log(total)