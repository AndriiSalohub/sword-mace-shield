const moveVariants = document.querySelectorAll(".game-interface__user-move");
const enemyMoveImage = document.querySelector(
    ".game-interface__opponent-choose"
);
const roundCounter = document.querySelector(".game-interface__rounds");
const lives = document.querySelector(".game-interface__lives");
const combatArea = document.querySelector(".game-interface__combat-area");
const gameInterfaceStatus = document.querySelector(".game-interface__status");
const opponentInterface = document.querySelector(".game-interface__opponent");

let playerMove = "";
let enemyMove = "";
let round = 0;
let playerLives = 5;
let enemyLives = 5;

moveVariants.forEach((move) => {
    move.addEventListener("click", () => {
        playerMove = move.getAttribute("id");
        changeRound();
        generateRandomEnemyMove();
        resultCheck(playerMove, enemyMove);
    });
});

function changeRound() {
    round++;
    roundCounter.textContent = ` Round: ${round}`;
}

function generateRandomEnemyMove() {
    const randomIndex = Math.floor(Math.random() * moveVariants.length);
    enemyMove = moveVariants[randomIndex].getAttribute("id");
    enemyMoveImage.setAttribute("src", `src/images/${enemyMove}.png`);
}

function resultCheck(playerMove, enemyMove) {
    const isPlayerWin =
        (playerMove === "sword" && enemyMove === "mace") ||
        (playerMove === "mace" && enemyMove === "shield") ||
        (playerMove === "shield" && enemyMove === "sword");

    const isEnemyWin =
        (playerMove === "sword" && enemyMove === "shield") ||
        (playerMove === "shield" && enemyMove === "mace") ||
        (playerMove === "mace" && enemyMove === "sword");

    if (isPlayerWin) {
        playerLives--;
        displayCombatMessage(
            `Unfortunate defeat.. You lost one life, because your ${playerMove} lacks power against enemy's ${enemyMove}!`,
            "rgb(185, 107, 120)"
        );
    } else if (isEnemyWin) {
        enemyLives--;
        displayCombatMessage(
            `Impressive attack! The enemy lost one life, because the great power of your ${playerMove} crushed his ${enemyMove}!`,
            "rgb(98, 180, 156)"
        );
    } else {
        displayCombatMessage(
            `  Hmm.. Two ${playerMove}s mean a draw, so no lives were lost. Let's try again.`,
            "rgb(128, 112, 172)"
        );
    }

    updateLivesDisplay();
}

function displayCombatMessage(message, borderColor) {
    combatArea.textContent = message;
    gameInterfaceStatus.style.borderColor = borderColor;
    opponentInterface.style.borderColor = borderColor;
}

function updateLivesDisplay() {
    lives.textContent = `Your Lives: ${playerLives} ︱ Enemy's Lives: ${enemyLives}`;
}
