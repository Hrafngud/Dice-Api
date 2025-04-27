// src/models/diceModel.js (CommonJS)
const allowedDice = {
    d4: 4,
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
    d20: 20,
    d100: 100
  };
  
  const getDiceSides = (dice) => {
    return allowedDice[dice];
  };
  
  const rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
  };
  
  module.exports = { getDiceSides, rollDice };
  