export class CleaningCrews {
  static calculateCleaningCrews(input) {
    // loop over each line
    const crewList = input.split('\n');
    let overlapCount = 0;

    crewList.forEach(crew => {
      const teamArray = crew.split(',');
      const crew1Array = teamArray[0].split('-');
      const crew2Array = teamArray[1].split('-');
      const crew1Start = parseInt(crew1Array[0]);
      const crew1End = parseInt(crew1Array[1]);
      const crew2Start = parseInt(crew2Array[0]);
      const crew2End = parseInt(crew2Array[1]);

      // if crew 2 start is between crew 1 start and finish AND crew 2 end is between crew 1 start and finish OVERLAP
      if (crew2Start >= crew1Start && crew2End <= crew1End) {
        overlapCount++;
      } else if (crew1Start >= crew2Start && crew1End <= crew2End) {
        overlapCount++;
      }
    });
      return overlapCount;
  }

  // 2-4,6-8
// 2-3,4-5
// 5-7,7-9 - overlap
// 2-8,3-7 - overlap
// 6-6,4-6 - overlap
// 2-6,4-8 - overlap

    static calculateAllOverlap(input) {
    // loop over each line
    const crewList = input.split('\n');
    let overlapCount = 0;

    crewList.forEach(crew => {
      const teamArray = crew.split(',');
      const crew1Array = teamArray[0].split('-');
      const crew2Array = teamArray[1].split('-');
      const crew1Start = parseInt(crew1Array[0]);
      const crew1End = parseInt(crew1Array[1]);
      const crew2Start = parseInt(crew2Array[0]);
      const crew2End = parseInt(crew2Array[1]);

      // check if between crew 1 start and end
      if (crew1Start >= crew2Start && crew1Start <= crew2End) {
        overlapCount++;
      } else if (crew1End >= crew2Start && crew1End <= crew2End) {
        overlapCount++;
      } else if (crew2Start >= crew1Start && crew2Start <= crew1End) {
        overlapCount++;
      } else if (crew2End >= crew1Start && crew2End <= crew1End) {
        overlapCount++;
      }
    });
      return overlapCount;
  }
}
