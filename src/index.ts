import { readFileSync } from 'fs';
import path from 'path';

export function getInput(fileName: string): Array<number> {
  const input: Array<string> = readFileSync(path.join(__dirname, `./inputs/${fileName}`), 'utf-8').split('\n');

  const inputAsNumber: Array<number> = input.map((string) => +string);

  return inputAsNumber;
}

export function getCountOfIncreasedDepth(input: Array<number>): number {
  let count: number = 0;

  input.forEach((number, index) => {
    if(number < input[index + 1]) {
      count++;
    }
  })

  return count;
}