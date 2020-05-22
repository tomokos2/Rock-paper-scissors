let validSelections = ['Rock', 'Paper', 'Scissors'];
const DRAW = 2;
const WIN = 1;
const LOSE = 0;
const INVALID = -1;

function playGame(numRounds) {
    let numWins = 0;

    for (let i = 0; i < numRounds; i++) {
        const playerSelection = window.prompt("Please play rock, paper, or scissors");
        const computerSelection = computerPlay();
        console.log(sayPlays(playerSelection, computerSelection));

        let result = playRound(playerSelection, computerSelection);
        if (result == WIN) numWins++;
        else if (result == INVALID) i--;
    }

    console.log(sayEndGame(numWins, numRounds));

}

function playRound(playerSelection = "", computerSelection) {
    let player = playerSelection.toLowerCase();
    let comp = computerSelection.toLowerCase();

    if (!isValidSelection(player)) {
        console.log(sayInvalidSelection());
        return INVALID;
    }

    let playerWon = false;

    if (player === comp) {
        console.log(sayDraw(computerSelection));
        return DRAW;
    }

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
            console.log(sayInvalidSelection());
            return INVALID;           
    }

    console.log((playerWon) ? sayWin(playerSelection, computerSelection) : sayLose(playerSelection, computerSelection));
    return (playerWon) ? WIN : LOSE;
    
}

function computerPlay() {
    let randInt = Math.floor(Math.random() * 3);
    return validSelections[randInt];
}

function isValidSelection(playerSelection) {
    let isValid = false;;

    validSelections.forEach((selection) => {
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