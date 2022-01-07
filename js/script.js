// Global Variables 
const unorderedList = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textBox = document.querySelector(".letter"); // Text input where player inputs their letter guess
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const totalGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide");
//Test word
const word = "magnolia"
//guessedLetters will contain all letters that a player guesses.
const guessedLetters = [];

// Word Placeholder Function 
const placeholder = function () {
    const placeholderForLetters = [];
    for (const letters of word) {
        console.log(letters);
         placeholderForLetters.push("●")
         //.unshift() - Add one or more elements to the beginning of an array.
         //.push() - Add one or more elements to the end of an array.
     }
    wordInProgress.innerText = placeholderForLetters.join("");

};
placeholder(word); //8 ● should apear on the meassage for the amount of letters in word variable (magnolia)

// Event Handler for Button(Guess)
button.addEventListener("click", function (e){
    e.preventDefault();
    message.innerText = "";
    
    const guess = textBox.value; // input value
    console.log(guess);
    textBox.value = "";

    //verifyPlayersInput(guess);

    const goodGuess = verifyPlayersInput(guess);
    console.log(goodGuess);

    makeGuess(guess);
    
})

//Checks Players Input Function (verifiedInput)
const verifyPlayersInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    // If there was no letter input
    if (input.length === 0){
        message.innerText = "Please enter a Letter(A-Z).";
    } else if (input.length > 1) {
        message.innerText = "Please, only enter one Letter(A-Z).";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Synbols/Numbers are not accepted. Please enter a Letter(A-Z).";
    } else {
        return input; //If a input was a letter A-Z
    }
};

// Validate Input in the Button Event Handler
// + Called verityPlayersInput(guess)
// + Emptied text of Elem. (message.innerText = "";)

// Added a Global Variable for Players Guesses (const guessedLetters = [])

//Capture Input Function
const makeGuess = function (guess) {
    guess = guess.toUpperCase(); 
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already guessed that letter. Try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters); //consoles out the input letters into an array []
    }
    // Plays input is returning a letter, therefor makeGuess will pass "guess" in Button Event Handler
};

