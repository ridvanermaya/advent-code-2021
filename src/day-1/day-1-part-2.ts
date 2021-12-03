import { sum } from 'lodash';
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

export function getCountOfIncreasedWindowSum(input: Array<number>): number {
  let count: number = 0;

  input.forEach((number, index) => {
    let current: Array<number> = [];
    let next: Array<number> = [];

    if (input[index + 2] !== undefined && input[index + 1] !== undefined) {
      current = [number, input[index + 1], input[index + 2]];
      next = [input[index + 1], input[index + 2], input[index + 3]];
    }

    if (getSumOfWindow(next) > getSumOfWindow(current)) {
      count++;
    }
  });

  return count;
}

export function getSumOfWindow(input: Array<number>): number {
  return sum(input);
}

const input = getInput('day-1-input.txt');
const count = getCountOfIncreasedWindowSum(input);

console.log(`Day 1 Part 2`);
console.log(`The count of increased window is ${count}`);