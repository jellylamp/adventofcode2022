import { serialize } from "v8";

export class FileTree {

  directorySizes: any = {};
  runningIndex = 0;
  tree = [
    '/'
  ];

  constructor(input) {
    this.directorySizes['/'] = this.parseInputTree(input.split('\n'));
  }


  // $ cd /
  // $ ls
  // dir a
  // 14848514 b.txt
  // 8504156 c.dat
  // dir d
  // $ cd a
  // $ ls
  // dir e
  // 29116 f
  // 2557 g
  // 62596 h.lst
  // $ cd e
  // $ ls
  // 584 i
  // $ cd ..
  // $ cd ..
  // $ cd d
  // $ ls
  // 4060174 j
  // 8033020 d.log
  // 5626152 d.ext
  // 7214296 k

  parseInputTree(inputArr: string[]): number {
    let size = 0;

    for (this.runningIndex; this.runningIndex < inputArr.length; this.runningIndex++) {
      const line = inputArr[this.runningIndex];
      // if startWith $ its a new command
      if (line.startsWith('$')) {
        if (line.startsWith('$ cd')) {
          if (line === '$ cd ..') {
            // if cd .. go back one 
            this.runningIndex = this.runningIndex;
            return size;
          } else {
            // increment the running index so we can start on the next line and make sure it also includes the current index.
            this.runningIndex = this.runningIndex;
            this.runningIndex++;
            const dirSize = this.parseInputTree(inputArr);

            // add to parent
            size += dirSize;

            // add your own entry to directory size
            const dirArr = line.split(' ');
            const dirName = dirArr[2];

            this.directorySizes[dirName + this.runningIndex] = dirSize;
          }
        }

      } else {
        if (line.startsWith('dir')) {
          // ignore for now, may need to map out the tree.
          continue;
        } else {
          // grab the size add it to the running size!
          const lineArr = line.split(' ');
          size += parseInt(lineArr[0]);
        }
      }
    }
    return size;
  }

  getAllDirsEqualOrUnder100000(): number {
    const maxSize = 100000;
    let runningSum = 0;

    for (const property in this.directorySizes) {
      const propSize = this.directorySizes[property];
      if (propSize <= maxSize) {
        runningSum += propSize;
      }
    }

    return runningSum;
  }

  getMostEfficientDirToDelete(): number {
    const maxFileSize = 70000000;
    const minimumSpaceNeeded = 30000000;
    const currentSize = this.directorySizes['/'];
    const unusedSpace = maxFileSize - currentSize;
    const dirsThatCanBeDeleted = {};

    // find all eligible sizes to delete
    for (const property in this.directorySizes) {
      const propSize = this.directorySizes[property];

      if (unusedSpace + propSize >= minimumSpaceNeeded) {
        dirsThatCanBeDeleted[property] = propSize;
      }
    }
    let smallestNumber = currentSize;

    // get smallest one
    for (const property in dirsThatCanBeDeleted) {
      if (dirsThatCanBeDeleted[property] < smallestNumber) {
        smallestNumber = dirsThatCanBeDeleted[property];
      }
    }
    return smallestNumber;
  }
}