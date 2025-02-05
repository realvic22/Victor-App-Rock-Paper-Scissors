const choices = ["rock", "paper", "scissors"];
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const outcomeMessageEl = document.getElementById("outcome-message");
const playAgainBtn = document.getElementById("play-again");
const scoreEl = document.getElementById("score");
const toggleInstructionsBtn = document.getElementById("toggle-instructions");
const instructionsEl = document.getElementById("instructions");
const closeInstructionsBtn = document.getElementById("close-instructions");

let score = 0;

// Load score and theme from localStorage
if (localStorage.getItem("rpsScore")) {
  score = Number.parseInt(localStorage.getItem("rpsScore"));
  scoreEl.textContent = score;
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
