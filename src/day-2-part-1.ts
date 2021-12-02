import { readFileSync } from 'fs';
import { join } from 'path';

export interface Command {
  direction: string;
  value: number;
}

export function getInput(fileName: string): Array<Command> {
  const input: Array<string> = readFileSync(
    join(__dirname, `./inputs/${fileName}`),
    'utf-8'
  ).split('\n');

  const inputAsArrayOfCommands: Array<Command> = input.map((string) => {
    const command: Command = getCommand(string);

    return command;
  });

  return inputAsArrayOfCommands;
}

export function getCommand(command: string): Command {
  const commandArray: Array<string> = command.split(' ');
  return {
    direction: commandArray[0],
    value: +commandArray[1],
  };
}

export function calculateFinalPosition(input: Array<Command>): number {
  let x: number = 0;
  let y: number = 0;

  input.forEach((command) => {
    switch (command.direction) {
      case 'forward':
        x += command.value;
        break;
      case 'backward':
        x -= command.value;
        break;
      case 'down':
        y -= command.value;
        break;
      case 'up':
        y += command.value;
        break;
    }
  });
  return Math.abs(x * y);
}
