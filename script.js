// Game state
const TIME_PER_QUESTION_SECONDS = 30;
const REVEAL_DELAY_MS = 1500;
const MAX_ZOOM = 4;

const elements = {
  questionCounter: document.getElementById("question-counter"),
  score: document.getElementById("score"),
  animalImage: document.getElementById("animal-image"),
  imageFrame: document.getElementById("animal-image").parentElement,
  imageCredit: document.getElementById("image-credit"),
  timerBar: document.getElementById("timer-bar"),
  timerText: document.getElementById("timer-text"),
  options: document.getElementById("options"),
  questionCard: document.getElementById("question-card"),
  endscreen: document.getElementById("endscreen"),
  finalScore: document.getElementById("final-score"),
  endHeadline: document.getElementById("end-headline"),
  endMessage: document.getElementById("end-message"),
  playAgain: document.getElementById("play-again"),
};

let questions = [];
let currentIndex = 0;
let totalScore = 0;
let timerStart = null;
let timerFrameId = null;
let questionLocked = false;

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function startGame() {
  questions = shuffle(QUIZ_ANIMALS).map((q) => ({
    ...q,
    shuffledOptions: shuffle(q.options),
  }));
  currentIndex = 0;
  totalScore = 0;
  elements.score.textContent = "0.0";
  elements.endscreen.classList.add("hidden");
  elements.questionCard.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  questionLocked = false;
  const q = questions[currentIndex];

  elements.questionCounter.textContent = `${currentIndex + 1} / ${questions.length}`;
  elements.animalImage.src = q.image;
  elements.imageCredit.textContent = q.credit || "";

  // Pick a fresh random zoom point in the central band (avoids landing on pure sky/grass)
  // and start fully zoomed in. The CSS transition is removed (no .revealing class) so
  // the per-frame JS updates drive the zoom smoothly during play.
  elements.imageFrame.classList.remove("revealing");
  const originX = 30 + Math.random() * 40;
  const originY = 30 + Math.random() * 40;
  elements.animalImage.style.transformOrigin = `${originX}% ${originY}%`;
  elements.animalImage.style.transform = `scale(${MAX_ZOOM})`;

  elements.options.innerHTML = "";
  for (const option of q.shuffledOptions) {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(option, btn));
    elements.options.appendChild(btn);
  }

  startTimer();
}

function revealImage() {
  // Adds a CSS transition that smoothly zooms out to full size for the reveal pause.
  elements.imageFrame.classList.add("revealing");
}

function startTimer() {
  timerStart = performance.now();
  elements.timerBar.classList.remove("urgent");
  tickTimer();
}

function tickTimer() {
  const elapsedMs = performance.now() - timerStart;
  const totalMs = TIME_PER_QUESTION_SECONDS * 1000;
  const remainingMs = Math.max(0, totalMs - elapsedMs);
  const remainingSeconds = remainingMs / 1000;
  const progress = 1 - remainingMs / totalMs; // 0 at start, 1 at end

  elements.timerBar.style.width = `${(1 - progress) * 100}%`;
  elements.timerText.textContent = `${remainingSeconds.toFixed(1)}s`;

  // Zoom out in lockstep with the timer: MAX_ZOOM at start, 1 at the moment of timeout.
  const scale = MAX_ZOOM - (MAX_ZOOM - 1) * progress;
  elements.animalImage.style.transform = `scale(${scale})`;

  if (remainingSeconds <= 5) {
    elements.timerBar.classList.add("urgent");
  }

  if (remainingMs <= 0) {
    handleTimeout();
    return;
  }

  timerFrameId = requestAnimationFrame(tickTimer);
}

function stopTimer() {
  if (timerFrameId) {
    cancelAnimationFrame(timerFrameId);
    timerFrameId = null;
  }
  const elapsedMs = performance.now() - timerStart;
  const remainingMs = Math.max(0, TIME_PER_QUESTION_SECONDS * 1000 - elapsedMs);
  return remainingMs / 1000;
}

function handleAnswer(chosenOption, buttonEl) {
  if (questionLocked) return;
  questionLocked = true;

  const remainingSeconds = stopTimer();
  const q = questions[currentIndex];
  const isCorrect = chosenOption === q.correct;

  if (isCorrect) {
    const earned = Math.round(remainingSeconds * 10) / 10;
    totalScore += earned;
    elements.score.textContent = totalScore.toFixed(1);
    buttonEl.classList.add("correct");
  } else {
    buttonEl.classList.add("wrong");
    revealCorrect();
  }

  revealImage();
  disableAllOptions();
  setTimeout(advance, REVEAL_DELAY_MS);
}

function handleTimeout() {
  if (questionLocked) return;
  questionLocked = true;
  stopTimer();
  revealCorrect();
  revealImage();
  disableAllOptions();
  setTimeout(advance, REVEAL_DELAY_MS);
}

function revealCorrect() {
  const correct = questions[currentIndex].correct;
  for (const btn of elements.options.querySelectorAll("button")) {
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  }
}

function disableAllOptions() {
  for (const btn of elements.options.querySelectorAll("button")) {
    btn.disabled = true;
  }
}

function advance() {
  currentIndex += 1;
  if (currentIndex >= questions.length) {
    showEndscreen();
  } else {
    showQuestion();
  }
}

function showEndscreen() {
  elements.questionCard.classList.add("hidden");
  elements.endscreen.classList.remove("hidden");
  elements.finalScore.textContent = totalScore.toFixed(1);

  const maxPossible = TIME_PER_QUESTION_SECONDS * questions.length;
  const ratio = totalScore / maxPossible;
  let headline, message;
  if (ratio >= 0.85) {
    headline = "🏆 Animal genius!";
    message = "Lightning fast and razor sharp. Are you secretly David Attenborough?";
  } else if (ratio >= 0.6) {
    headline = "🌟 Brilliant!";
    message = "Solid knowledge AND quick fingers. Nice combo.";
  } else if (ratio >= 0.35) {
    headline = "🐾 Not bad!";
    message = "A respectable showing. The savanna would be proud.";
  } else if (ratio > 0) {
    headline = "🦔 Keep practising!";
    message = "Every wildlife documentary fan started somewhere.";
  } else {
    headline = "🦥 Ouch.";
    message = "Either the cat was on the keyboard, or... try again?";
  }
  elements.endHeadline.textContent = headline;
  elements.endMessage.textContent = message;
}

elements.playAgain.addEventListener("click", startGame);

startGame();
