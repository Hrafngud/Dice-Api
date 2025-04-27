const express = require('express');
const { rollDiceHandler } = require('../controllers/rollController.js');

const router = express.Router();

router.post('/', rollDiceHandler);

module.exports = router;

