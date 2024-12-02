import { inputFile, readDelimitedData, readDelimitedInputData, readInputLines, readLines, scriptRootDirectory } from "../utils/fileUtils.mjs";


//console.log(scriptRootDirectory())
const text = await readDelimitedInputData( ",")
console.log(text);