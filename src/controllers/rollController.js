const { getDiceSides, rollDice } = require('../models/diceModel.js');

const rollDiceHandler = (req, res) => {
  let { dice, times = 1, bet } = req.body;
  times = parseInt(times, 10); // Ensure times is an integer (even if it's sent as a string)

  // Validate dice type
  const sides = getDiceSides(dice);
  if (!sides) {
    return res.status(400).json({ status: 'error', error: 'Invalid or missing dice type.' });
  }

  // Validate times (make sure times is a valid number within range)
  if (isNaN(times) || times < 1 || times > 100) {
    return res.status(400).json({ status: 'error', error: 'Times must be a number between 1 and 100.' });
  }

  const rolls = Array.from({ length: times }, () => rollDice(sides));
  const response = { status: 'success', dice, rolls };

  // Bet validation (only validate if bet is provided)
  if (bet !== undefined && bet !== null && bet !== '') {
    bet = parseInt(bet, 10); // Ensure bet is a number
    if (isNaN(bet) || bet < 1 || bet > sides) {
      return res.status(400).json({ status: 'error', error: `Bet must be a number between 1 and ${sides}.` });
    }

    const betResults = rolls.map(roll => roll === bet);
    response.bet = bet;
    response.betResults = betResults;
    response.message = betResults.includes(true) ? 'You hit your bet! 🎯' : 'No luck this time. Try again! 🎲';
  }

  res.json(response);
};

module.exports = { rollDiceHandler };
