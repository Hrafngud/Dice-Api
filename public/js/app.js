document.getElementById('diceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const dice = document.getElementById('dice').value;
    const times = parseInt(document.getElementById('times').value, 10);
    const bet = document.getElementById('bet').value || null;
    const betNumber = bet ? parseInt(bet, 10) : null; 

    const response = await fetch('/roll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dice, times, bet }),
    });
  
    const result = await response.json();
    displayResult(result);
  });
  
  // Enable/disable bet input based on selected dice
  document.getElementById('dice').addEventListener('change', (e) => {
    const betInput = document.getElementById('bet');
    const selectedDice = e.target.value;
  
    // Enable bet input only if dice is in valid options (like d6, d8, etc.)
    if (['d4', 'd6', 'd8', 'd10', 'd12', 'd20'].includes(selectedDice)) {
      betInput.disabled = false;
      betInput.hidden = false;
    } else {
      betInput.disabled = true;
      betInput.hidden = true;
    }
  });
  
  // Call this to trigger the logic when the page loads (in case a dice type is pre-selected)
  document.getElementById('dice').dispatchEvent(new Event('change'));
  
  function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <h2>Roll Results:</h2>
      <p><strong>Dice:</strong> ${result.dice}</p>
      <p><strong>Rolls:</strong> ${result.rolls.join(', ')}</p>
      ${result.bet !== undefined ? `<p><strong>Bet:</strong> ${result.bet}</p>` : ''}
      ${result.betResults ? `<p><strong>Bet Results:</strong> ${result.betResults.join(', ')}</p>` : ''}
      <p><strong>Message:</strong> ${result.message}</p>
    `;
  }
