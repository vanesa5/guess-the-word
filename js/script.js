// Global Variables 
const unorderedList = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textBox = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const totalGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide");
//Test word
const word = "magnolia"

// Word Placeholder Function 
const placeholder = function () {
    const placeholderForLetters = [];
    for (const letters of word) {
        console.log(letters);
        placeholderForLetters.push("●")
    }
    wordInProgress.innerText = placeholderForLetters.join("");

};
placeholder(word); //8 ● should apear on the meassage for the amount of letters in word variable (magnolia)