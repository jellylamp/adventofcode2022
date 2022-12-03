type Elf = {
  calories: number;
}

export class ElfGroup {
  elfList: Elf[] = [];

  constructor(input: string) {
    this.elfList = this.setElfList(input);
    this.elfList.sort((a, b) => b.calories - a.calories);
  }

  setElfList(input): Elf[] {
    const foodList = input.split('\n');
    const elfList = [];
    // loop over foodlist and look for empty box. Start a new elf.

    let currentElf = {
      calories: 0
    };
    foodList.forEach(food => {
      if (food === '') {
        // start a new elf
        elfList.push(currentElf);
        currentElf = {
          calories: 0
        };
      } else {
        // add to elf
        currentElf.calories += parseFloat(food);
      }
    });
    elfList.push(currentElf);

    return elfList;
  }
 
  getMaxCalories(): number {
    return this.elfList[0].calories;
  }

  getTopThreeCalories(): number {
    return this.elfList[0].calories + this.elfList[1].calories + this.elfList[2].calories;
  }
}
