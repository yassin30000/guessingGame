const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });


let secretNumber;
let numAttempts;

function checkGuess(n) {
    numAttempts--;
    if (n > secretNumber) {
        console.log('\nToo High');
        return false;
    }
    if (n < secretNumber) {
        console.log('\nToo Low');
        return false;
    }
    if (n === secretNumber) { 
        console.log('\nCorrect!');
        return true;
    }
}

function askGuess () {
    rl.question('\nGues a Number: ', (str) => {
        if (checkGuess(Number(str))) {
            console.log('\nYou Win!\n');
            rl.close();
        } else if (numAttempts === 0) {
            console.log('\nYou Lose!\n');
            console.log(`\nThe Secret Number was ${secretNumber}!\n`);
            rl.close();
        } else {
            askGuess();
        }
    });
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function askRange() {
    rl.question('Enter a Max Number: ', (max) => {
        rl.question('Enter a Min Number: ',(min) => {
            console.log(`\nI'm thinking of a number between ${min} and ${max}...`);
            secretNumber = randomInRange(Number(min), Number(max));
            askGuess();
        })
    })
}

function askLimit() {
    rl.question('\nEnter a limit of tries: ', (n) => {
        numAttempts = n;
        askRange();
    })
}

askLimit();