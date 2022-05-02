//CONTEXT SETTING (Variables)
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;



//SHIT THAT HAPPENS
guessField.focus();

function checkGuess() {
    //Set a variable to the number that the user has input (changing the string input to a number)
    const userGuess = Number(guessField.value);
    //If the user is on their first guess, the text should say "Previous Guesses"
    if (guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }
    //Add the newest guess to the string of previous guesses
    guesses.textContent += userGuess + ' ';
  
    // If the user guess is equal to the random number...
    if (userGuess === randomNumber) {
      //Display yaaaaaaay!
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      //We're taking away the content that indicates too low or too high
      lowOrHi.textContent = '';
      //Calling a function to reset the game
      setGameOver();
    } else if (guessCount === 10) { //If the guess count is equal to 10
      //Display game over
      lastResult.textContent = '!!!GAME OVER!!!';
      //Empty string in low or high
      lowOrHi.textContent = '';
      //Calling game over function
      setGameOver();
    } else {
      //Set wrong, set bg color to red
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = 'red';
      //If the guess was too low, display that.
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if(userGuess > randomNumber) { //If the guess was too high, display that
        lowOrHi.textContent = `Last guess was too high!`;
      }
    }
  
    guessCount = guessCount + 1;     //Increment by one      //guessCount++;
    guessField.value = ''; //Field goes back to being blank
    guessField.focus(); //Puts the cursor back into that area
  }

  //Adds a Karen to our guess submit button to listen for a click
  guessSubmit.addEventListener('click', checkGuess);


  function setGameOver() {
    //Set the status of the fields to disabled so that the user can't keep guessing
    guessField.disabled = true;
    guessSubmit.disabled = true;
    //Creates a new button on the page to start a new game
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.append(resetButton);
    //Add a Karen to listen for us to click so we can restart the game and everyone can go back home
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
    guessCount = 1; //Reset counter to 1
  
    //Reset every paragraph to an empty strong
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
      resetPara.textContent = '';
    }
  
    //Delete reset button
    resetButton.parentNode.removeChild(resetButton);
  
    //Turn the guess field and guess submit back on
    guessField.disabled = false;
    guessSubmit.disabled = false;
    //Set the value back to nothing
    guessField.value = '';
    //Putting the cursor back on guessField
    guessField.focus();
  
    //Change background color to white
    lastResult.style.backgroundColor = 'white';
  
    //Randomize the number
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }
  

  $("input").on("keydown",function search(e) {
    if(e.keyCode == 13) {
        checkGuess();
    }
});