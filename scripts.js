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
  const toggleMusicBtn = document.getElementById("toggle-music");
  const toggleInstructionsBtn = document.getElementById("toggle-instructions");
  const instructionsEl = document.getElementById("instructions");
  const closeInstructionsBtn = document.getElementById("close-instructions");
  const gameAudio = document.getElementById("game-audio"); // Updated line
  const howToPlayBtn = document.getElementById("how-to-play"); // Added line

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

  toggleMusicBtn.addEventListener("click", () => {
    // Updated event listener
    if (gameAudio.paused) {
      gameAudio.play();
      toggleMusicBtn.textContent = "🔊";
    } else {
      gameAudio.pause();
      toggleMusicBtn.textContent = "🔇";
    }
  });

  toggleInstructionsBtn.addEventListener("click", () => {
    instructionsEl.classList.remove("hidden");
  });

  closeInstructionsBtn.addEventListener("click", () => {
    instructionsEl.classList.add("hidden");
  });

  howToPlayBtn.addEventListener("click", () => {
    // Added event listener
    instructionsEl.classList.remove("hidden");
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

  function celebrateWin() {
    // Import confetti function here if it's from an external library.  For this example, we'll just simulate it.
    console.log("Confetti celebration!");
  }

  // Initialize the game
  function initGame() {
    // Updated initGame function
    gameAudio.volume = 0.5; // Set initial volume to 50%
  }

  initGame();
});
