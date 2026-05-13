// Game variables
let playerScore = 0;
let computerScore = 0;
let gameOver = false;
const WINNING_SCORE = 10;
const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

// Get DOM elements
const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');
const resetBtn = document.getElementById('resetBtn');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const playerChoiceDisplay = document.getElementById('playerChoice');
const computerChoiceDisplay = document.getElementById('computerChoice');
const resultDisplay = document.getElementById('result');
const gameOverMessage = document.getElementById('gameOverMessage');
const buttonsContainer = document.getElementById('buttonsContainer');

// Add event listeners
rockBtn.addEventListener('click', () => playGame('rock'));
paperBtn.addEventListener('click', () => playGame('paper'));
scissorsBtn.addEventListener('click', () => playGame('scissors'));
resetBtn.addEventListener('click', resetGame);

// Main game function
function playGame(playerChoice) {
    // Check if game is over
    if (gameOver) {
        return;
    }

    // Disable buttons during play
    disableButtons();

    // Get computer choice
    const computerChoice = getComputerChoice();

    // Display choices with animation
    playerChoiceDisplay.innerHTML = `<span class="choice-emoji">${emojis[playerChoice]}</span>`;
    computerChoiceDisplay.innerHTML = `<span class="choice-emoji">${emojis[computerChoice]}</span>`;

    // Add active class for animation
    playerChoiceDisplay.classList.add('active');
    computerChoiceDisplay.classList.add('active');

    // Determine winner after a short delay for visual effect
    setTimeout(() => {
        const result = determineWinner(playerChoice, computerChoice);

        // Update scores
        if (result === 'win') {
            playerScore++;
            resultDisplay.textContent = '🎉 You Win!';
            resultDisplay.className = 'result-message win';
        } else if (result === 'lose') {
            computerScore++;
            resultDisplay.textContent = '💻 Computer Wins!';
            resultDisplay.className = 'result-message lose';
        } else {
            resultDisplay.textContent = "🤝 Draw!";
            resultDisplay.className = 'result-message draw';
        }

        // Update score displays
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;

        // Check for game over
        checkGameOver();

        // Enable buttons after animation if game is not over
        setTimeout(() => {
            if (!gameOver) {
                enableButtons();
            }
            playerChoiceDisplay.classList.remove('active');
            computerChoiceDisplay.classList.remove('active');
        }, 1000);
    }, 500);
}

// Get random computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine winner
function determineWinner(player, computer) {
    if (player === computer) {
        return 'draw';
    }

    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }

    return 'lose';
}

// Check if game is over
function checkGameOver() {
    if (playerScore >= WINNING_SCORE) {
        gameOver = true;
        gameOverMessage.textContent = '🏆 You Win the Game! 🏆';
        gameOverMessage.style.color = '#27ae60';
        disableButtons();
    } else if (computerScore >= WINNING_SCORE) {
        gameOver = true;
        gameOverMessage.textContent = '🤖 Computer Wins the Game! 🤖';
        gameOverMessage.style.color = '#e74c3c';
        disableButtons();
    }
}

// Disable buttons
function disableButtons() {
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
}

// Enable buttons
function enableButtons() {
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    playerChoiceDisplay.innerHTML = '<span class="choice-emoji">🪨</span>';
    computerChoiceDisplay.innerHTML = '<span class="choice-emoji">🪨</span>';
    resultDisplay.textContent = '';
    gameOverMessage.textContent = '';
    playerChoiceDisplay.classList.remove('active');
    computerChoiceDisplay.classList.remove('active');
    enableButtons();
}
