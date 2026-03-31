export class DiceRoller {
  static roll(diceNotation) {
    const regex = /(\d+)d(\d+)([+\-]\d+)?/i;
    const match = diceNotation.match(regex);

    if (!match) {
      return { error: 'Invalid dice notation' };
    }

    const numDice = parseInt(match[1]);
    const diceSize = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;

    if (numDice < 1 || numDice > 100 || diceSize < 1) {
      return { error: 'Invalid dice parameters' };
    }

    const rolls = [];
    let total = 0;

    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * diceSize) + 1;
      rolls.push(roll);
      total += roll;
    }

    total += modifier;

    return {
      notation: diceNotation,
      rolls,
      subtotal: rolls.reduce((a, b) => a + b, 0),
      modifier,
      total,
      average: ((rolls.length * (diceSize + 1) / 2) + modifier).toFixed(1)
    };
  }

  static rollMultiple(diceNotation, count) {
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(this.roll(diceNotation));
    }
    return results;
  }

  static getCommonRolls() {
    return [
      '1d4', '1d6', '1d8', '1d10', '1d12', '1d20', '1d100',
      '2d6', '2d8', '2d10', '3d6', '4d6'
    ];
  }
}