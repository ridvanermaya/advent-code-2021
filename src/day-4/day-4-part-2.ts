import { readFileSync } from 'fs';
import { sum } from 'lodash';
import { join } from 'path';

export interface Input {
  numbersToDraw: Array<number>;
  boards: Array<Array<Array<BoardItem>>>;
}

export interface BoardItem {
  found: boolean;
  value: number;
}

export interface Winner {
  winnerFound: boolean;
  unFoundNumbers: Array<BoardItem>;
  winnerBoard: Array<Array<BoardItem>>;
}

export function getInput(fileName: string): Input {
  const fileContent: Array<string> = readFileSync(
    join(__dirname, `../inputs/${fileName}`),
    'utf-8'
  )
    .split('\n')
    .filter((value) => value !== '');

  const numbersDrawn: Array<number> = fileContent[0]
    .split(',')
    .map((value) => +value);

  const boards: Array<Array<Array<BoardItem>>> = [];

  for (let index = 1; index < fileContent.length; index += 5) {
    if (index !== 0 && fileContent[index + 4] !== undefined) {
      const board: Array<Array<BoardItem>> = [];

      const boardRow = createBoardRow(fileContent, index);

      board.push(
        boardRow[0],
        boardRow[1],
        boardRow[2],
        boardRow[3],
        boardRow[4],
        boardRow[5],
        boardRow[6],
        boardRow[7],
        boardRow[8],
        boardRow[9]
      );

      boards.push(board);
    }
  }

  return {
    numbersToDraw: numbersDrawn,
    boards: boards,
  };
}

export function createBoardRow(
  fileContent: Array<string>,
  index: number
): Array<Array<BoardItem>> {
  const boardRow: Array<Array<BoardItem>> = [];

  const boardRowOne: Array<BoardItem> = fileContent[index]
    .split(' ')
    .filter((value) => value !== '')
    .map((value) => {
      return {
        value: +value,
        found: false,
      };
    });

  const boardRowTwo: Array<BoardItem> = fileContent[index + 1]
    .split(' ')
    .filter((value) => value !== '')
    .map((value) => {
      return {
        value: +value,
        found: false,
      };
    });

  const boardRowThree: Array<BoardItem> = fileContent[index + 2]
    .split(' ')
    .filter((value) => value !== '')
    .map((value) => {
      return {
        value: +value,
        found: false,
      };
    });

  const boardRowFour: Array<BoardItem> = fileContent[index + 3]
    .split(' ')
    .filter((value) => value !== '')
    .map((value) => {
      return {
        value: +value,
        found: false,
      };
    });

  const boardRowFive: Array<BoardItem> = fileContent[index + 4]
    .split(' ')
    .filter((value) => value !== '')
    .map((value) => {
      return {
        value: +value,
        found: false,
      };
    });

  const boardRowSix: Array<BoardItem> = [
    boardRowOne[0],
    boardRowTwo[0],
    boardRowThree[0],
    boardRowFour[0],
    boardRowFive[0],
  ];

  const boardRowSeven: Array<BoardItem> = [
    boardRowOne[1],
    boardRowTwo[1],
    boardRowThree[1],
    boardRowFour[1],
    boardRowFive[1],
  ];

  const boardRowEight: Array<BoardItem> = [
    boardRowOne[2],
    boardRowTwo[2],
    boardRowThree[2],
    boardRowFour[2],
    boardRowFive[2],
  ];

  const boardRowNine: Array<BoardItem> = [
    boardRowOne[3],
    boardRowTwo[3],
    boardRowThree[3],
    boardRowFour[3],
    boardRowFive[3],
  ];

  const boardRowTen: Array<BoardItem> = [
    boardRowOne[4],
    boardRowTwo[4],
    boardRowThree[4],
    boardRowFour[4],
    boardRowFive[4],
  ];

  boardRow.push(boardRowOne);
  boardRow.push(boardRowTwo);
  boardRow.push(boardRowThree);
  boardRow.push(boardRowFour);
  boardRow.push(boardRowFive);
  boardRow.push(boardRowSix);
  boardRow.push(boardRowSeven);
  boardRow.push(boardRowEight);
  boardRow.push(boardRowNine);
  boardRow.push(boardRowTen);

  return boardRow;
}

export function playGiantSquidGame(input: Input): number {
  let winningScore = 0;
  let unfoundNumbers: Array<BoardItem> = [];
  let isGameOver = false;

  for (let index = 0; index < input.numbersToDraw.length; index++) {
    if (isGameOver) break;
    const numberDrawn = input.numbersToDraw[index];
    for (let i = 0; i < input.boards.length; i++) {
      const board = input.boards[i];

      for (let j = 0; j < board.length; j++) {
        const boardRow = board[j];

        for (let k = 0; k < boardRow.length; k++) {
          const boardItem = boardRow[k];

          if (boardItem.value === numberDrawn && !boardItem.found) {
            input.boards[i][j][k].found = true;
          }
        }
      }
    }

    for (let index = 0; index < input.boards.length; index++) {
      const board = input.boards[index];
      const winner: Winner = checkForWinner(board);

      if (winner.winnerFound) {
        if (input.boards.length === 1) {
          winner.winnerBoard.splice(5, 5);

          const winnerBoardWithAllRows: Array<BoardItem> = [];
          winner.winnerBoard.forEach((boardRow) => {
            winnerBoardWithAllRows.push(...boardRow);
          });

          unfoundNumbers = winnerBoardWithAllRows.filter(
            (boardItem) => boardItem.found === false
          );

          const total = sum(unfoundNumbers.map((value) => value.value));

          winningScore = total * numberDrawn;

          isGameOver = true;

          break;
        } else {
          const indexToBeRemoved = input.boards.indexOf(winner.winnerBoard);
          input.boards.splice(indexToBeRemoved, 1);
        }
      }
    }
  }

  return winningScore;
}

export function checkForWinner(board: Array<Array<BoardItem>>): Winner {
  let unfoundNumbers: Array<BoardItem> = [];
  let winnerFound = false;
  let winnerBoard: Array<Array<BoardItem>> = [];
  let winBoard: Array<Array<BoardItem>> = [];

  for (let i = 0; i < board.length; i++) {
    if (winnerFound) break;
    const boardRow = board[i];

    winnerFound = checkForBingo(boardRow);

    if (winnerFound) {
      winBoard = board;
      winnerBoard = board.splice(5, 5);

      const winnerBoardWithAllRows: Array<BoardItem> = [];
      winnerBoard.forEach((boardRow) => {
        winnerBoardWithAllRows.push(...boardRow);
      });

      unfoundNumbers = winnerBoardWithAllRows.filter(
        (boardItem) => boardItem.found === false
      );
    }
  }

  return {
    winnerFound: winnerFound,
    unFoundNumbers: unfoundNumbers,
    winnerBoard: winBoard,
  };
}

export function checkForBingo(rowOrColumn: Array<BoardItem>): boolean {
  const filteredArray: Array<BoardItem> = rowOrColumn.filter(
    (boardItem) => boardItem.found === true
  );

  return filteredArray.length === 5 ? true : false;
}

const input = getInput('day-4-input.txt');
const finalScore = playGiantSquidGame(input);

console.log(`Day 4 Part 2`);
console.log(`The winning final score is ${finalScore}`);
