const { getDiceSides, rollDice } = require('../models/diceModel.js');

class RollService {
  static validateDiceType(dice) {
    const sides = getDiceSides(dice);
    if (!sides) {
      throw new Error('Invalid or missing dice type.');
    }
    return sides;
  }

  static validateBet(bet, sides) {
    const parsedBet = parseInt(bet, 10);
    if (isNaN(parsedBet) || parsedBet < 1 || parsedBet > sides) {
      throw new Error(`Bet must be a number between 1 and ${sides}.`);
    }
    return parsedBet;
  }

  static rollDice(sides) {
    return rollDice(sides);
  }

  static processBet(roll, bet) {
    const betResult = roll === bet;
    const message = betResult ? 'You hit your bet! 🎯' : 'No luck this time. Try again! 🎲';
    return { betResult, message };
  }

  static handleRollRequest({ dice, bet }) {
    // Validate inputs
    const sides = this.validateDiceType(dice);

    // Roll the dice
    const roll = this.rollDice(sides);

    // Prepare response
    const response = { status: 'success', dice, roll };

    // Process bet if provided
    if (bet !== undefined && bet !== null && bet !== '') {
      const validatedBet = this.validateBet(bet, sides);
      const { betResult, message } = this.processBet(roll, validatedBet);
      response.bet = validatedBet;
      response.betResult = betResult;
      response.message = message;
    }
    console.log(response);
    return response;
  }
}

module.exports = RollService;