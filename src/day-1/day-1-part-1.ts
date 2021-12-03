import { readFileSync } from 'fs';
import { join } from 'path';

export function getInput(fileName: string): Array<number> {
  const input: Array<string> = readFileSync(
    join(__dirname, `../inputs/${fileName}`),
    'utf-8'
  ).split('\n');

  const inputAsNumber: Array<number> = input.map((string) => +string);

  return inputAsNumber;
}

export function getCountOfIncreasedDepth(input: Array<number>): number {
  let count: number = 0;

  input.forEach((number, index) => {
    if (number < input[index + 1]) {
      count++;
    }
  });

  return count;
}

const input = getInput('day-1-input.txt');
const count = getCountOfIncreasedDepth(input);

console.log(`Day 1 Part 1`);
console.log(`The count of increased depth is ${count}`);