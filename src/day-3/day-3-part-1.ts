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

export function getGammaRate(input: Array<string>): string {
  const gammaValue: number = input.filter((element) => element === '1').length;
  const epilsonValue: number = input.filter(
    (element) => element === '0'
  ).length;

  return gammaValue > epilsonValue ? '1' : '0';
}

export function getEpilsonRate(input: Array<string>): string {
  const gammaValue: number = input.filter((element) => element === '1').length;
  const epilsonValue: number = input.filter(
    (element) => element === '0'
  ).length;

  return gammaValue < epilsonValue ? '1' : '0';
}

export function calculatePowerConsumption(input: Array<Array<string>>): number {
  const rowLength: number = input[0].length;

  let gammaRate: Array<string> = [];
  let epilsonRate: Array<string> = [];

  for (let i = 0; i < rowLength; i++) {
    const eachColumn: Array<string> = [];
    
    for (let j = 0; j < input.length; j++) {
      let stringValue: string = input[j][i];
      eachColumn.push(stringValue);
    }

    gammaRate.push(getGammaRate(eachColumn));
    epilsonRate.push(getEpilsonRate(eachColumn));
  }

  const gammaRateString: string = gammaRate.join('');
  const epilsonRateString: string = epilsonRate.join('');

  return parseInt(gammaRateString, 2) * parseInt(epilsonRateString, 2);
}

const input = getInput('day-3-input.txt');
const powerConsumption = calculatePowerConsumption(input);

console.log(`Day 3 Part 1`);
console.log(`The final position is ${powerConsumption}`);