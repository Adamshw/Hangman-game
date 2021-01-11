
var words = ['one', 'car', 'taxi', 'lamp', 'phone', 'elephent', 'sweden'];
var selectedWord = "";
var userInputArr = [];
let wordStatus = null;
var lifeCounter = 0;
var maxMistake = 5;


function secretWord() {
  var randomWord = Math.floor(Math.random() * words.length);
  selectedWord = words[randomWord];
}

function userInput() {

  let userInputLetter = document.querySelector('#input').value

  if (userInputLetter.match(/^[A-Za-z]+$/) &&
    userInputLetter.length == 1) {

    const letter = document.createElement("li");
    const list = document.querySelector("#user-input")

    list.append(letter);
    letter.innerHTML = userInputLetter;

    userInputArr.push(userInputLetter);
    document.querySelector("input").value = "";
    if (selectedWord.indexOf(userInputLetter) >= 0) {
      gussedWord();
      userWon();
    } else {

      lifeCounter++;
      hangMan(lifeCounter);

    }
  }
  else {
    alert("Invalid input")
    document.querySelector("input").value = "";
  }
}


function hangMan(lifeCounter) {


  if (lifeCounter == 1) {
    document.querySelector('figure').classList.add("scaffold");
  }
  if (lifeCounter == 2) {
    document.querySelector('figure').classList.add("head");
  }
  if (lifeCounter == 3) {
    document.querySelector('figure').classList.add("body");
  }
  if (lifeCounter == 4) {
    document.querySelector('figure').classList.add("arms");
  }
  if (lifeCounter == 5) {
    document.querySelector('figure').classList.add("legs");
  }
  if (lifeCounter == maxMistake) {
    userLost();
  }
}

function userLost() {
  document.getElementById("popup-2").classList.toggle("active");
}

function userWon() {
  if (wordStatus == selectedWord) {
    document.getElementById("popup-1").classList.toggle("active");
  }
}


function gussedWord() {

  wordStatus = selectedWord.split('').map(letter => (userInputArr.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById("secret--word").innerHTML = wordStatus;
}

function startTimer(duration, display) {
  var timer = duration, seconds;
  setInterval(function () {
      
      seconds = parseInt(timer % 60, 10);
      seconds = seconds < 10 ? "" + seconds : seconds;
      display.textContent =  seconds;

      if (--timer < 0) {
          timer = duration;
          userLost();
      }
  }, 1000);
}
window.onload = function () {
  var oneMinutes = 59 ;
      display = document.querySelector('#time');
  startTimer(oneMinutes, display);
};


secretWord();
gussedWord();

