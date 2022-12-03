enum RPSObjects {
    ROCK = 'ROCK' ,
    PAPER = 'PAPER',
    SCISSORS = 'SCISSORS'
}

const scores = {
  'ROCK': 1,
  'PAPER': 2,
  'SCISSORS': 3
};

const opponentCypher = {
  'A': RPSObjects.ROCK,
  'B': RPSObjects.PAPER,
  'C': RPSObjects.SCISSORS,
};

const personalCypher = {
  'X': RPSObjects.ROCK,
  'Y': RPSObjects.PAPER,
  'Z':  RPSObjects.SCISSORS
};

const DRAW_SCORE = 3;
const LOSE_SCORE = 0;
const WIN_SCORE = 6;

export class RockPaperScissors {
  static calculateScore(input: string): number {
    const roundList = input.split('\n');
    let score = 0;

    roundList.forEach(round => {
      const roundArr = round.split(' ');
      const opponentChoice = roundArr[0];
      const personalChoice = roundArr[1];
      const opponentType = opponentCypher[opponentChoice];
      const personalType = personalCypher[personalChoice];

      // score based round based on what you played
      score += scores[personalType];

      // score based on win rate
      if (opponentType === personalType) {
        score += DRAW_SCORE;
      } else {
        switch (personalType) {
          case RPSObjects.ROCK:
            if (opponentType === RPSObjects.SCISSORS) {
              score += WIN_SCORE;
            } else {
              score += LOSE_SCORE
            }
            break;
          case RPSObjects.PAPER:
            if (opponentType === RPSObjects.ROCK) {
              score += WIN_SCORE;
            } else {
              score += LOSE_SCORE
            }
            break;
          case RPSObjects.SCISSORS:
            if (opponentType === RPSObjects.PAPER) {
              score += WIN_SCORE;
            } else {
              score += LOSE_SCORE
            }
            break;
        }
      }
    });

    return score;
  }
}
