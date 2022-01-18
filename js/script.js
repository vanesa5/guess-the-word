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
let word = "magnolia"; //let allows you to reuse the variable word in Async Function.
//guessedLetters will contain all letters that a player guesses.
const guessedLetters = [];
//Limit Guesses/Trys
const remainingTries = 8;

//=========================================

// Async Function getWord()
const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text() //.text() bc its a text file and not a json file.
    console.log(words);
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);

    word = wordArray[randomIndex].trim(); //trim() will get rig of all the extra white space around each word

    placeholder(word);

};
getWord(); // displays a long list of words on the consule in alph. order 






// Word Placeholder Function 
const placeholder = function () {
    const placeholderForLetters = [];
    for (const letter of word) {
        console.log(letter);
         placeholderForLetters.push("●");
         //.unshift() - Add one or more elements to the beginning of an array.
         //.push() - Add one or more elements to the end of an array.
     }
    wordInProgress.innerText = placeholderForLetters.join("");

};
//placeholder(word); //8 ● should apear on the meassage for the amount of letters in word variable (magnolia)

// Event Handler for Button(Guess)
button.addEventListener("click", function (e){
    e.preventDefault();
    message.innerText = "";
    
    const guess = textBox.value; // input value
    //console.log(guess);
    textBox.value = "";

    //verifyPlayersInput(guess);

    const goodGuess = verifyPlayersInput(guess);
    //console.log(goodGuess);
    if (goodGuess){
    makeGuess(guess); //consoles out the input letters into an array []
    }
});

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
        message.innerText = "You have already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters); 
        showGuessedLetter();
        updateWordInProgress(guessedLetters);
        
    }
    // Plays input is returning a letter, therefor makeGuess will pass "guess" in Button Event Handler
};

//Show Guessed Letters Function
const showGuessedLetter = function () {
    unorderedList.innerText = "";
    for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerHTML = letter;
        unorderedList.append(li);
    }
    //call this function inside makeGuess() in else statement
};


// Update Word in Progress Function
const updateWordInProgress = function (guessedLetters) {

        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split("");
        //console.log(wordArray);
        const revealLetter = [];
        for (const letter of wordArray){
            if (guessedLetters.includes(letter)) {
                revealLetter.push(letter.toUpperCase());
            } else {
                revealLetter.push("●");
            }
        }
        wordInProgress.innerText = revealLetter.join("");
        // If guessed Correclty, Winner Fuction with reveal win message
        winner();

};

// Guesses Remaining Function
const guessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `The Word does not contain ${guess}.`
        remainingTries -= 1; 
    } else {
        message.innerText = ` Good guess! The word has letter ${guess}.`
    }
    if (remainingTries === 0) {
        message.innerText = `Game Over. The word was ${word}.`
    }
};

// Winner Function
const winner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
       message.classList.add("Win");
       message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
       
    }
}

