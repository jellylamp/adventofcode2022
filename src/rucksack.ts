export class Rucksack {
  static getRucksackCount(input): number {
    const rucksackList = input.split('\n')
    let score = 0;

    // loop over each rucksack
    rucksackList.forEach(rucksack  => {
      // split into two
      const stringHalf = Math.floor(rucksack.length / 2);
      const compartment1 = rucksack.substring(0, stringHalf);
      const compartment2 = rucksack.substring(stringHalf, rucksack.length);

      const uniqueLetters = [];
       for (let i = 0; i < compartment1.length; i++){
          if (compartment2.includes(compartment1[i])){
             uniqueLetters.push(compartment1[i])
          }
       }
       const uniqueSet = Array.from(new Set(uniqueLetters));
       score += Rucksack.scoreArray(uniqueSet);
    });
    return score;
  }

  static getGroupId(input): number {
    const rucksackList = input.split('\n')
    let score = 0;

    // grab rucksacks 3 at a time
    for (let i = 0; i < rucksackList.length; i += 3) {
      const elf1 = rucksackList[i];
      const elf2 = rucksackList[i+1];
      const elf3 = rucksackList[i+2];

      const uniqueLetters = [];

       for (let j = 0; j < elf1.length; j++){
          if (elf2.includes(elf1[j]) && elf3.includes(elf1[j])){
             uniqueLetters.push(elf1[j])
          }
       }
       const uniqueSet = Array.from(new Set(uniqueLetters));
       score += Rucksack.scoreArray(uniqueSet);
    }

    return score;
  }

  static scoreArray(uniqueLetters): number {
    let score = 0;
    uniqueLetters.forEach(letter => {
      if (letter === letter.toUpperCase()) {
        score = parseInt(letter, 36) - 9 + 26;
      } else {
        score = parseInt(letter, 36) - 9;
      }
    });
    return score;
  }
}
