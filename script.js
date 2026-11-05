// Difficulty settings
let difficulty = "normal";

// Game settings for each difficulty
const difficulties = {

    easy: {
        time: 45,
        goal: 50,
        bottleSpeed: 1500
    },

    normal: {
        time: 30,
        goal: 100,
        bottleSpeed: 850
    },

    hard: {
        time: 20,
        goal: 150,
        bottleSpeed: 500
    }
// Select difficulty
function selectDifficulty(level) {

    // Save selected difficulty
    difficulty = level;

    // Get difficulty settings
    const settings = difficulties[level];

    // Display selected difficulty
    document.getElementById("difficulty-message").textContent =
        "Selected: " + level.toUpperCase() +
        " | Time: " + settings.time +
        " seconds | Goal: " + settings.goal + " points";

    // Highlight selected button
    const buttons = document.querySelectorAll(".difficulty-buttons button");

    buttons.forEach(function(button) {

        button.classList.remove("selected");

    });

    // Highlight clicked button
    event.target.classList.add("selected");

}
};
// Game variables
let score = 0;
let timeLeft = 30;

let timer;
let bottleTimer;

let gameRunning = false;


// Get HTML elements
const scoreDisplay = document.getElementById("score");

const timerDisplay = document.getElementById("timer");

const gameArea = document.getElementById("game-area");

const messageScreen = document.getElementById("message-screen");

const message = document.getElementById("message");

const finalScore = document.getElementById("final-score");

const startButton = document.getElementById("start-button");


// START THE GAME
function startGame() {

    if (gameRunning) {
        return;
    }

    // Get selected difficulty settings
    const settings = difficulties[difficulty];

    // Set game values
    score = 0;

    timeLeft = settings.time;

    gameRunning = true;

    scoreDisplay.textContent = score;

    timerDisplay.textContent = timeLeft;

    messageScreen.classList.add("hidden");

    startButton.classList.add("hidden");

    // Start countdown
    timer = setInterval(function() {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            endGame(false);

        }

    }, 1000);

    // Create bottles based on difficulty speed
    bottleTimer = setInterval(function() {

        createBottle();

    }, settings.bottleSpeed);

    // Create first bottle
    createBottle();

}

    // Start the countdown
    timer = setInterval(function() {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            endGame(false);

        }

    }, 1000);


    // Create a bottle every second
    bottleTimer = setInterval(function() {

        createBottle();

    }, 850);


    // Create the first bottle
    createBottle();

}


// CREATE WATER BOTTLES
function createBottle() {

    if (!gameRunning) {
        return;
    }

    const bottle = document.createElement("button");

    // Randomly choose full or empty
    const isEmpty = Math.random() < 0.3;


    if (isEmpty) {

        bottle.textContent = "🧴";

        bottle.dataset.type = "empty";

    } else {

        bottle.textContent = "💧";

        bottle.dataset.type = "full";

    }


    bottle.classList.add("bottle");


    // Random bottle position
    const maxX = gameArea.clientWidth - 50;

    const maxY = gameArea.clientHeight - 70;

    bottle.style.left = Math.random() * maxX + "px";

    bottle.style.top = Math.random() * maxY + "px";


    // What happens when a bottle is clicked
    bottle.addEventListener("click", function() {

        if (!gameRunning) {
            return;
        }


        // FULL BOTTLE
        if (bottle.dataset.type === "full") {

            score += 10;

            scoreDisplay.textContent = score;

            bottle.remove();


            
            // Get the winning goal for selected difficulty
const winningGoal = difficulties[difficulty].goal;

if (score >= winningGoal) {
    endGame(true);
}
            }

        }


        // EMPTY BOTTLE
        else {

            timeLeft -= 5;

            if (timeLeft < 0) {

                timeLeft = 0;

            }

            timerDisplay.textContent = timeLeft;

            bottle.remove();


            // Lose if time reaches zero
            if (timeLeft <= 0) {

                endGame(false);

            }

        }

    });


    // Add bottle to the living room
    gameArea.appendChild(bottle);


    // Remove bottle after 3.5 seconds
    setTimeout(function() {

        bottle.remove();

    }, 3500);

}


// END THE GAME
function endGame(won) {

    gameRunning = false;

    clearInterval(timer);

    clearInterval(bottleTimer);


    // Remove remaining bottles
    document.querySelectorAll(".bottle").forEach(function(bottle) {

        bottle.remove();

    });


    messageScreen.classList.remove("hidden");

    startButton.classList.add("hidden");


    // WINNING SCREEN
    if (won) {

        message.textContent = "🏆 YOU WIN!";

        finalScore.textContent =
            "Amazing! You collected 10 water bottles!";

        createConfetti();

    }


    // LOSING SCREEN
    else {

        message.textContent = "😢 GAME OVER!";

        finalScore.textContent =
            "Time ran out! Your final score is " + score;

    }

}


// CREATE CONFETTI
function createConfetti() {

    const colors = [
        "red",
        "blue",
        "yellow",
        "green",
        "pink",
        "purple"
    ];


    for (let i = 0; i < 100; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti");


        // Random confetti position
        confetti.style.left = Math.random() * 100 + "vw";


        // Random confetti color
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];


        // Random animation delay
        confetti.style.animationDelay =
            Math.random() * 2 + "s";


        document.body.appendChild(confetti);


        // Remove confetti after animation
        setTimeout(function() {

            confetti.remove();

        }, 5000);

    }

}


// RESET THE GAME
function resetGame() {

    clearInterval(timer);

    clearInterval(bottleTimer);

    gameRunning = false;

    // Get selected difficulty settings
    const settings = difficulties[difficulty];

    // Reset score and timer
    score = 0;

    timeLeft = settings.time;

    scoreDisplay.textContent = score;

    timerDisplay.textContent = timeLeft;

    // Hide winning or losing screen
    messageScreen.classList.add("hidden");

    // Show start button
    startButton.classList.remove("hidden");

    // Remove bottles
    document.querySelectorAll(".bottle").forEach(function(bottle) {

        bottle.remove();

    });

    // Remove confetti
    document.querySelectorAll(".confetti").forEach(function(piece) {

        piece.remove();

    });

}

    // Remove confetti
    document.querySelectorAll(".confetti").forEach(function(piece) {

        piece.remove();

    });

}