// The computer will choose from these
const VALID_SELECTIONS = ['Rock', 'Paper', 'Scissors'];
const DRAW = 2;
const WIN = 1;
const LOSE = 0;
const INVALID = -1;


// Plays the game with selected number of rounds
function playGame(numRounds) {

    let numWins = 0;

    // Play rounds until max rounds reached
    for (let i = 0; i < numRounds; i++) {

        // Prompt the user to choose a hand
        const playerSelection = window.prompt("Please play rock, paper, or scissors");
        // Auto generate the computer hand
        const computerSelection = computerPlay();

        // Report to the player
        console.log(sayPlays(playerSelection, computerSelection));

        // Check the winner of the round
        let result = playRound(playerSelection, computerSelection);
        
        // Increment if the player won
        if (result == WIN) numWins++;
        // If the play was invalid, redo the round
        else if (result == INVALID) i--;
    }

    // Report the end results
    console.log(sayEndGame(numWins, numRounds));

}

// Represents one round of the game, and returns whether the player won, lost, drew, or had an invalid game
function playRound(playerSelection = "", computerSelection) {
    // Normalize
    let player = playerSelection.toLowerCase();
    let comp = computerSelection.toLowerCase();

    // Check to make sure the player input was valid
    if (!isValidSelection(player)) {
        console.log(sayInvalidSelection());
        return INVALID;
    }

    let playerWon = false;

    // Checks for a draw
    if (player === comp) {
        console.log(sayDraw(computerSelection));
        return DRAW;
    }

    // Will check to see if the player won
    switch(player) {
        case "rock" :
            if (comp === "scissors") playerWon = true;
            break;
        case "paper" :
            if (comp === "rock") playerWon = true;
            break;
        case "scissors" :
            if (comp === "paper") playerWon = true;
            break;
        default :
            // This statement should not be reached
            console.warn(sayInvalidSelection());
            return INVALID;           
    }

    // Report the result of the round
    console.log((playerWon) ? sayWin(playerSelection, computerSelection) : sayLose(playerSelection, computerSelection));
    
    return (playerWon) ? WIN : LOSE;
}

function computerPlay() {
    // Random play generator
    let randInt = Math.floor(Math.random() * VALID_SELECTIONS.length);
    return VALID_SELECTIONS[randInt];
}

function isValidSelection(playerSelection) {
    let isValid = false;;

    // Make sure that the player choice is within the valid choices
    VALID_SELECTIONS.forEach((selection) => {
        if (selection.toLowerCase() === playerSelection) {
            isValid = true;   
        }
    });

    return isValid;
}

function sayWin(winnerSelection, loserSelection) {
    return `You Win! ${winnerSelection} beats ${loserSelection}!`;
}

function sayLose(winnerSelection, loserSelection) {
    return `You Lose! ${winnerSelection} does not beat ${loserSelection}!`;
}

function sayDraw(selection) {
    return `Your drew! You both played ${selection}`;
}

function sayInvalidSelection() {
    return "You have entered an invalid selection. Please choose 'rock', 'paper', or 'scissors'.";
}

function sayPlays(playerSelection, computerSelection) {
    return `You played ${playerSelection}, and the computer played ${computerSelection}.`;
}

function sayEndGame(numWins, numRounds) {
    return `You won ${numWins} out of ${numRounds} rounds`;
}