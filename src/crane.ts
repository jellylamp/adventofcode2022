export class Crane {
  craneMap: string[][] = [[], []];
  craneText: string[] = [];

  constructor(input) {
    this.initializeMap(input);
    this.moveCrane();
  }

  initializeMap(input) {
    // loop over inputs until you find a number
    const inputLines = input.split('\n');

    for (let i = 0; i < inputLines.length; i++) {
      const line = inputLines[i];

      if (line.charAt(1) !== ' ' && !isNaN(line.charAt(1))) {
        // found the end of the array - skip empty newline
        this.craneText = inputLines.slice(i + 2);
        break;
      }
      // split each line into chunks of 4
      const craneData = line.match(/.{1,4}/g);

      // filter out unwanted characters for easier parsing.
      for (let j = 0; j < craneData.length; j++) {
        let bucket: string = craneData[j];
        bucket = bucket.replace(/ /g, '');
        bucket = bucket.replace('[', '');
        bucket = bucket.replace(']', '');
        craneData[j] = bucket;
      }

      this.craneMap[i] = craneData;
    }
  }

  //     [D]
  // [N] [C]
  // [Z] [M] [P]
  //  1   2   3
  //
  // move 1 from 2 to 1
  // move 3 from 1 to 3
  // move 2 from 2 to 1
  // move 1 from 1 to 2

  moveCrane() {
    this.craneText.forEach(instruction => {
      const instructionArr = this.parseInstruction(instruction);
      const moveCount = parseInt(instructionArr[0]);
      const moveFrom = parseInt(instructionArr[1]) - 1; // zero index
      const moveTo = parseInt(instructionArr[2]) - 1; // zero index

      for (let i = 0; i < moveCount; i++) {
        let findMoveFromIndex = this.findFirstColumnValue(0, moveFrom);
        let findMoveToIndex = this.findFirstColumnValue(0, moveTo) - 1; // subtract 1 to put on TOP
        const itemToMove = this.craneMap[findMoveFromIndex][moveFrom];

        if (findMoveToIndex === -1) {
          // add a row on top of the array so it can grow
          const numValues = this.craneMap[0].length;
          const emptyArr = [];
          for (let k = 0; k < numValues; k++) {
            emptyArr.push('');
          }
          this.craneMap.slice().unshift(emptyArr);
          this.craneMap = [...[emptyArr], ...this.craneMap];
          findMoveToIndex = 0;
          findMoveFromIndex++;
        }

        this.craneMap[findMoveFromIndex][moveFrom] = '';
        this.craneMap[findMoveToIndex][moveTo] = itemToMove;
      }
    });
  }

  findFirstColumnValue(rowIndex, moveFrom) {
    // make sure to handle completely empty row
    if (rowIndex === this.craneMap.length) {
      return rowIndex;
    }

    const moveFromRowValue = this.craneMap[rowIndex][moveFrom];
    if (moveFromRowValue === '') {
      rowIndex++;
      rowIndex = this.findFirstColumnValue(rowIndex, moveFrom);
    }
    return rowIndex;
  }

  parseInstruction(instruction) {
    // take string "move 1 from 2 to 1" to parse into a known format.
    // take out words
    instruction = instruction.replace('move ', '');
    instruction = instruction.replace('from ', '');
    instruction = instruction.replace('to ', '');
    return instruction.split(' ');
  }

  getTopValue(column) {
    for (let i = 0; i < this.craneMap.length; i++) {
      const item = this.craneMap[i][column];
      if (item !== '') {
        return item;
      }
    }

    return '';
  }

  getTopCraneItems() {
    let topString = '';
    const numColumns = this.craneMap[0].length;
    for (let i = 0; i < numColumns; i++) {
      const topColumnValue = this.getTopValue(i);
      topString += topColumnValue;
    }
    return topString;
  }
}
