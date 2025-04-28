const RollService = require('../services/rollService');

const rollDiceHandler = (req, res) => {
  try {
    const response = RollService.handleRollRequest(req.body);
    res.json(response);
  } catch (error) {
    res.status(400).json({ status: 'error', error: error.message });
  }
};

module.exports = { rollDiceHandler };