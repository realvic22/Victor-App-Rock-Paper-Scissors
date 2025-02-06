document.addEventListener("DOMContentLoaded", () => {
  const choices = ["rock", "paper", "scissors"];
  const choicesEl = document.getElementById("choices");
  const resultEl = document.getElementById("result");
  const playerChoiceEl = document.getElementById("player-choice");
  const computerChoiceEl = document.getElementById("computer-choice");
  const outcomeMessageEl = document.getElementById("outcome-message");
  const playAgainBtn = document.getElementById("play-again");
  const scoreEl = document.getElementById("score");
  const toggleThemeBtn = document.getElementById("toggle-theme");
  const howToPlayBtn = document.getElementById("how-to-play");
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

  choicesEl.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("choice") ||
      e.target.parentElement.classList.contains("choice")
    ) {
      const playerChoice =
        e.target.dataset.choice || e.target.parentElement.dataset.choice;
      playRound(playerChoice);
    }
  });

  playAgainBtn.addEventListener("click", () => {
    choicesEl.classList.remove("hidden");
    resultEl.classList.add("hidden");
  });

  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });

  howToPlayBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (instructionsEl.classList.contains("hidden")) {
      instructionsEl.classList.remove("hidden");
    } else {
      instructionsEl.classList.add("hidden");
    }
  });

  closeInstructionsBtn.addEventListener("click", () => {
    instructionsEl.classList.add("hidden");
  });

  function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const outcome = getOutcome(playerChoice, computerChoice);

    displayResult(playerChoice, computerChoice, outcome);
  }

  function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function getOutcome(player, computer) {
    if (player === computer) return "Draw";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "Win";
    }
    return "Lose";
  }

  function displayResult(playerChoice, computerChoice, outcome) {
    playerChoiceEl.textContent = getEmoji(playerChoice);
    computerChoiceEl.textContent = getEmoji(computerChoice);
    outcomeMessageEl.textContent = `You ${outcome}!`;

    if (outcome === "Win") {
      score++;
      celebrateWin();
    } else if (outcome === "Lose") {
      score = Math.max(0, score - 1);
    }

    scoreEl.textContent = score;
    // Save score to localStorage
    localStorage.setItem("rpsScore", score);

    choicesEl.classList.add("hidden");
    resultEl.classList.remove("hidden");
  }

  function getEmoji(choice) {
    switch (choice) {
      case "rock":
        return "✊";
      case "paper":
        return "✋";
      case "scissors":
        return "✌️";
    }
  }

  //Import confetti function.  This assumes confetti.js is included in your HTML file.
  function celebrateWin() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  // Initialize the game
  function initGame() {
    // No initialization needed for this version
  }

  initGame();
});
