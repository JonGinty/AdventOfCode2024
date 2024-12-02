import fs from 'fs/promises';
import path from 'path';


export async function readLines(filePath) {
    const text = await readText(filePath);
    return splitLines(text);
}

export async function readInputLines() {
    return await readLines(inputFile());
}

export async function readText(filePath) {
    return await fs.readFile(filePath, {encoding: "utf-8"});
}

export async function readInputText() {
    return await readText(inputFile());
}

export async function readDelimitedData(filePath, delimiter) {
    return (await readLines(filePath)).map(row => row.split(delimiter));
}

export async function readDelimitedInputData(delimiter) {
    return await readDelimitedData(inputFile(), delimiter);
}

/**
 * manipulation stuff
 */
export function splitLines(lines) {
    return lines.split("\n").map((s) => s.trimEnd());
}


/**
 * index stuff
 */
export function scriptRootDirectory() {
    const scriptPath = process.argv[1];
    return path.dirname(scriptPath);
}

export function scriptRootRelative(filePath) {
    const root = scriptRootDirectory();
    return path.join(root, filePath);
}

export function inputFile() {
    return scriptRootRelative("input.txt");
}