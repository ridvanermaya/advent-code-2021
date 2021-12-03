import { readFileSync } from 'fs';
import { join } from 'path';

export function getInput(fileName: string): Array<Array<string>> {
  const inputAsMatrix: Array<Array<string>> = [];
  const input: Array<string> = readFileSync(
    join(__dirname, `../inputs/${fileName}`),
    'utf-8'
  ).split('\n');

  input.forEach((element) => inputAsMatrix.push(element.split('')));

  return inputAsMatrix;
}

export function getMostCommonValue(input: Array<string>): string {
  const countOfZeros = input.filter((element) => element === '0').length;
  const countOfOnes = input.filter((element) => element === '1').length;

  if (countOfOnes > countOfZeros) return '1';
  if (countOfOnes < countOfZeros) return '0';
  return '1';
}

export function getLeastCommonValue(input: Array<string>): string {
  const countOfZeros = input.filter((element) => element === '0').length;
  const countOfOnes = input.filter((element) => element === '1').length;

  if (countOfOnes > countOfZeros) return '0';
  if (countOfOnes < countOfZeros) return '1';
  return '0';
}

export function calculateOxygenGeneratorRating(
  input: Array<Array<string>>
): number {
  const rowLength: number = input[0].length;
  let filteredArray: Array<Array<string>> = input;

  for (let i = 0; i < rowLength; i++) {
    const eachColumn: Array<string> = [];

    if (filteredArray.length === 1) {
      break;
    }

    for (let j = 0; j < filteredArray.length; j++) {
      let stringValue: string = filteredArray[j][i];
      eachColumn.push(stringValue);
    }

    const mostCommonValue: string = getMostCommonValue(eachColumn);

    filteredArray = filteredArray.filter((element) => {
      if (element[i] === mostCommonValue) {
        return true;
      } else {
        return false;
      }
    });
  }

  return parseInt(filteredArray[0].join(''), 2);
}

export function calculateC02ScrubberRating(
  input: Array<Array<string>>
): number {
  const rowLength: number = input[0].length;
  let filteredArray: Array<Array<string>> = input;

  for (let i = 0; i < rowLength; i++) {
    const eachColumn: Array<string> = [];

    if (filteredArray.length === 1) {
      break;
    }

    for (let j = 0; j < filteredArray.length; j++) {
      let stringValue: string = filteredArray[j][i];
      eachColumn.push(stringValue);
    }

    const leastCommonValue: string = getLeastCommonValue(eachColumn);

    filteredArray = filteredArray.filter((element) => {
      if (element[i] === leastCommonValue) {
        return true;
      } else {
        return false;
      }
    });
  }

  return parseInt(filteredArray[0].join(''), 2);
}

export function calculateLifeSupportRating(
  oxygenGeneratorRating: number,
  co2ScrubberRating: number
) {
  return oxygenGeneratorRating * co2ScrubberRating;
}

const input = getInput('day-3-input.txt');
const oxygenGeneratorRating = calculateOxygenGeneratorRating(input);
const co2ScrubberRating = calculateC02ScrubberRating(input);
const lifeSupportRating = calculateLifeSupportRating(
  oxygenGeneratorRating,
  co2ScrubberRating
);

console.log(`Day 3 Part 2`);
console.log(`The life support rating of the submarine is ${lifeSupportRating}`);
