// PLAY GAME SOUNDS

function playSound(soundName) {

    let sound = document.getElementById(soundName);

    // Restart sound from the beginning
    sound.currentTime = 0;

    // Play the sound
    sound.play().catch(function(error) {
        console.log("Sound could not play:", error);
    });

}
// Game variables
let score = 0;
let timeLeft = 30;

let timer;
let bottleTimer;

let gameRunning = false;

let difficulty = "easy";


// Difficulty settings
const difficulties = {

    easy: {
        time: 45,
        goal: 50,
        speed: 1500
    },

    normal: {
        time: 30,
        goal: 100,
        speed: 850
    },

    hard: {
        time: 20,
        goal: 150,
        speed: 500
    }

};


// Get HTML elements
const scoreDisplay = document.getElementById("score");

const timerDisplay = document.getElementById("timer");

const goalDisplay = document.getElementById("goal");

const messageScreen = document.getElementById("message-screen");

const message = document.getElementById("message");

const finalScore = document.getElementById("final-score");

const startButton = document.getElementById("start-button");

const difficultyMessage =
    document.getElementById("difficulty-message");


// SELECT DIFFICULTY
function selectDifficulty(level, button) {

    if (gameRunning) {
        return;
    }

    difficulty = level;

    const settings = difficulties[level];

    // Update selected difficulty text
    difficultyMessage.textContent =
        level.toUpperCase() + " MODE SELECTED!";

    // Update timer and goal preview
    timeLeft = settings.time;

    timerDisplay.textContent = timeLeft;

    goalDisplay.textContent = settings.goal;

    // Highlight selected button
    document.querySelectorAll(".difficulty").forEach(function(btn) {

        btn.classList.remove("selected");

    });

    button.classList.add("selected");

}


// START GAME
function startGame() {

    if (gameRunning) {
        return;
    }

    const settings = difficulties[difficulty];

    score = 0;

    timeLeft = settings.time;

    gameRunning = true;

    scoreDisplay.textContent = score;

    timerDisplay.textContent = timeLeft;

    goalDisplay.textContent = settings.goal;
    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("progress-text").textContent = "0% Completed";

    messageScreen.classList.add("hidden");

    startButton.classList.add("hidden");


    // Start timer
    timer = setInterval(function() {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            endGame(false);

        }

    }, 1000);


    // Create bottles based on difficulty
    bottleTimer = setInterval(function() {

        createBottle();

    }, settings.speed);

    createBottle();

}


// CREATE BOTTLES
// Find the game area
const gameArea = document.getElementById("game-area");

// Find the game message
const gameMessage = document.getElementById("game-message");


// ADD A NEW WATER BOTTLE
function createBottle() {

    if (!gameRunning) {
        return;
    }

    // Create a new button element
    const bottle = document.createElement("button");

    // Choose a bonus, empty, or full bottle
    const random = Math.random();

    if (random < 0.15) {
        bottle.textContent = "⭐";
        bottle.dataset.type = "bonus";
    } else if (random < 0.4) {
        bottle.textContent = "🧴";
        bottle.dataset.type = "empty";
    } else {
        bottle.textContent = "💧";
        bottle.dataset.type = "full";
    }

    // Add bottle CSS class
    bottle.classList.add("bottle");

    // Give bottle a random position
    const maxX = gameArea.clientWidth - 50;

    const maxY = gameArea.clientHeight - 70;

    bottle.style.left = Math.random() * maxX + "px";

    bottle.style.top = Math.random() * maxY + "px";

    bottle.addEventListener("click", function() {

        if (!gameRunning) {
            return;
        }

        bottle.disabled = true;

        if (bottle.dataset.type === "full") {
            score += 10;
            gameMessage.textContent = "Great job! +10 points! 💧";
            playSound("collect-sound");
        } else if (bottle.dataset.type === "bonus") {
            score += 25;
            timeLeft += 3;
            gameMessage.textContent = "BONUS! +25 points and 3 seconds! ⭐";
            playSound("collect-sound");
        } else {
            timeLeft -= 5;
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            gameMessage.textContent = "Oops! -5 seconds! 🧴";
        }

        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;

        const progress = Math.min(
            (score / difficulties[difficulty].goal) * 100,
            100
        );
        document.getElementById("progress-bar").style.width = progress + "%";
        document.getElementById("progress-text").textContent =
            Math.round(progress) + "% Completed";

        removeBottle(bottle);

        if (score >= difficulties[difficulty].goal) {
            endGame(true);
        } else if (timeLeft <= 0) {
            endGame(false);
        }
    });

    gameArea.appendChild(bottle);

    // Remove the bottle after 3.5 seconds
    setTimeout(function() {
        if (bottle.parentElement) {
            bottle.remove();
        }
    }, 3500);

}


// REMOVE A BOTTLE
function removeBottle(bottle) {

    // Add disappearing animation
    bottle.classList.add("collected");

    // Wait for animation to finish
    setTimeout(function() {

        // Remove bottle from the DOM
        bottle.remove();

    }, 300);

}

// END GAME
function endGame(won) {

    if (!gameRunning) {
        return;
    }

    gameRunning = false;

    clearInterval(timer);

    clearInterval(bottleTimer);

    document.querySelectorAll(".bottle").forEach(function(bottle) {

        bottle.remove();

    });

    messageScreen.classList.remove("hidden");

    startButton.classList.add("hidden");


    if (won) {

        message.textContent = "🏆 YOU WIN!";

        finalScore.textContent =
            "Amazing! You reached " +
            difficulties[difficulty].goal +
            " points!";

        createConfetti();

    } else {

        message.textContent = "😢 GAME OVER!";

        finalScore.textContent =
            "Your final score was " + score + " points!";

    }

}


// CONFETTI
function createConfetti() {

    const colors = [
        "red",
        "blue",
        "yellow",
        "green",
        "pink",
        "purple",
        "orange"
    ];

    for (let i = 0; i < 150; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";

        document.body.appendChild(confetti);

        setTimeout(function() {

            confetti.remove();

        }, 5000);

    }

}


// RESET GAME
function resetGame() {

    clearInterval(timer);

    clearInterval(bottleTimer);

    gameRunning = false;

    score = 0;

    timeLeft = difficulties[difficulty].time;

    scoreDisplay.textContent = score;

    timerDisplay.textContent = timeLeft;

    goalDisplay.textContent = difficulties[difficulty].goal;
    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("progress-text").textContent = "0% Completed";

    messageScreen.classList.add("hidden");

    startButton.classList.remove("hidden");

    document.querySelectorAll(".bottle").forEach(function(bottle) {

        bottle.remove();

    });

    document.querySelectorAll(".confetti").forEach(function(piece) {

        piece.remove();

    });

}