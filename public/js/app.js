document.getElementById('diceForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dice = document.getElementById('dice').value;
  const bet = document.getElementById('bet').value || null;
  const errorMessage = document.getElementById('error-message');

  // Reset error message
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';

  try {
    const response = await fetch('/roll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dice, bet }),
    });

    const result = await response.json();

    if (result.status === 'error') {
      throw new Error(result.error);
    }

    displayResult(result);
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
    clearResult();
  }
});

// Enable/disable bet input based on selected dice
document.getElementById('dice').addEventListener('change', (e) => {
  const betInput = document.getElementById('bet');
  const selectedDice = e.target.value;

  if (['d4', 'd6', 'd8', 'd10', 'd12', 'd20'].includes(selectedDice)) {
    betInput.disabled = false;
    betInput.hidden = false;
  } else {
    betInput.disabled = true;
    betInput.hidden = true;
    betInput.value = '';
  }
});

// Call to trigger bet input logic on page load
document.getElementById('dice').dispatchEvent(new Event('change'));

function displayResult(result) {
  document.getElementById('result-dice').textContent = result.dice;
  document.getElementById('result-roll').textContent = result.roll;
  document.getElementById('result-bet').textContent = result.bet !== undefined ? result.bet : '-';
  
  const outcomeElement = document.getElementById('result-outcome');
  outcomeElement.textContent = result.message || '-';
  
  // Apply win/loss styling
  outcomeElement.classList.remove('win', 'loss');
  if (result.betResult !== undefined) {
    outcomeElement.classList.add(result.betResult ? 'win' : 'loss');
  }
}

function clearResult() {
  document.getElementById('result-dice').textContent = '-';
  document.getElementById('result-roll').textContent = '-';
  document.getElementById('result-bet').textContent = '-';
  const outcomeElement = document.getElementById('result-outcome');
  outcomeElement.textContent = '-';
  outcomeElement.classList.remove('win', 'loss');
}