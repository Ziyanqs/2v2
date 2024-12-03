let player1Score = 0;
let player2Score = 0;

// Get elements for player 1
const player1RollButton = document.getElementById("rollPlayer1");
const player1Dice1 = document.getElementById("player1Dice1");
const player1Dice2 = document.getElementById("player1Dice2");
const player1ScoreSpan = document.getElementById("player1Score");

// Get elements for player 2
const player2RollButton = document.getElementById("rollPlayer2");
const player2Dice1 = document.getElementById("player2Dice1");
const player2Dice2 = document.getElementById("player2Dice2");
const player2ScoreSpan = document.getElementById("player2Score");

// End round button
const endRoundButton = document.getElementById("endRound");

player1RollButton.addEventListener("click", () => {
    rollDice(1);
});

player2RollButton.addEventListener("click", () => {
    rollDice(2);
});

endRoundButton.addEventListener("click", endRound);

// Roll the dice for a player
function rollDice(player) {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    if (player === 1) {
        player1Dice1.textContent = dice1;
        player1Dice2.textContent = dice2;
        player1Score += dice1 + dice2;
        player1ScoreSpan.textContent = player1Score;

        // After player 1 rolls, disable their button and enable player 2's button
        player1RollButton.disabled = true;
        player2RollButton.disabled = false;
    } else {
        player2Dice1.textContent = dice1;
        player2Dice2.textContent = dice2;
        player2Score += dice1 + dice2;
        player2ScoreSpan.textContent = player2Score;

        // After player 2 rolls, disable their button
        player2RollButton.disabled = true;
    }
}

// End the round and determine the winner
function endRound() {
    let message = "";

    if (player1Score > player2Score) {
        message = "Player 1 Wins!";
    } else if (player2Score > player1Score) {
        message = "Player 2 Wins!";
    } else {
        message = "It's a Tie!";
    }

    // Show pop-up alert with the winner message
    alert(message);

    resetGame();
}

// Reset game after a round ends
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    player1ScoreSpan.textContent = player1Score;
    player2ScoreSpan.textContent = player2Score;
    player1Dice1.textContent = 0;
    player1Dice2.textContent = 0;
    player2Dice1.textContent = 0;
    player2Dice2.textContent = 0;
    player1RollButton.disabled = false;
    player2RollButton.disabled = true;
}
