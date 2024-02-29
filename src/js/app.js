const PLAYER_LIVES_INITIAL = 5;
const ENEMY_LIVES_INITIAL = 5;

const moveVariants = document.querySelectorAll(".game-interface__user-move");
const moveButtons = document.querySelectorAll(
    ".game-interface__user-move-button",
);
const enemyMoveImage = document.querySelector(".game-interface__enemy-choose");
const roundCounter = document.querySelector(".game-interface__rounds");
const lives = document.querySelector(".game-interface__lives");
const combatArea = document.querySelector(".game-interface__combat-area");
const gameInterfaceStatus = document.querySelector(".game-interface__status");
const enemyInterface = document.querySelector(".game-interface__enemy");
const endGame = document.querySelector(".game-interface__end-game");
const endGameTitle = document.querySelector(".game-interface__end-title");
const restartButton = document.querySelector(".game-interface__restart-button");

const player = {
    move: "",
    lives: PLAYER_LIVES_INITIAL,
};

const enemy = {
    move: "",
    lives: ENEMY_LIVES_INITIAL,
};
let round = 0;

moveVariants.forEach((move) => {
    move.addEventListener("click", () => {
        handlePlayerMove(move.getAttribute("id"));
    });
});

restartButton.addEventListener("click", restartGame);

function handlePlayerMove(move) {
    player.move = move;
    changeRound();
    generateRandomEnemyMove();
    resultCheck(player.move, enemy.move);
}

function changeRound() {
    round++;
    roundCounter.textContent = ` Round: ${round}`;
}

function generateRandomEnemyMove() {
    const randomIndex = Math.floor(Math.random() * moveVariants.length);
    enemy.move = moveVariants[randomIndex].getAttribute("id");
    enemyMoveImage.setAttribute("src", `./images/${enemy.move}.png`);
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
        enemy.lives--;
        displayCombatMessage(
            `Impressive attack! The enemy lost one life, because the great power of your ${playerMove} crushed his ${enemyMove}!`,
            "rgb(98, 180, 156)",
        );
    } else if (isEnemyWin) {
        player.lives--;
        displayCombatMessage(
            `Unfortunate defeat.. You lost one life, because your ${playerMove} lacks power against enemy's ${enemyMove}!`,
            "rgb(185, 107, 120)",
        );
    } else {
        displayCombatMessage(
            `  Hmm.. Two ${playerMove}s mean a draw, so no lives were lost. Let's try again.`,
            "rgb(128, 112, 172)",
        );
    }

    updateLivesDisplay();
    checkGameStatus();
}

function displayCombatMessage(message, borderColor) {
    combatArea.textContent = message;
    gameInterfaceStatus.style.borderColor = borderColor;
    enemyInterface.style.borderColor = borderColor;
}

function updateLivesDisplay() {
    lives.textContent = `Your Lives: ${player.lives} ︱ Enemy's Lives: ${enemy.lives}`;
}

function endGameAndDisableButtons(message) {
    endGame.style.display = "block";
    endGameTitle.textContent = message;
    moveButtons.forEach((moveButton) => {
        moveButton.setAttribute("disabled", "true");
    });
}

function checkGameStatus() {
    if (player.lives === 0) {
        endGameAndDisableButtons("You Lost This Battle!");
    }

    if (enemy.lives === 0) {
        endGameAndDisableButtons("You Won This Battle!");
    }
}

function restartGame() {
    player.move = "";
    player.lives = PLAYER_LIVES_INITIAL;

    enemy.move = "";
    enemy.lives = ENEMY_LIVES_INITIAL;

    round = 0;

    roundCounter.textContent = " Round: 0";
    lives.textContent = `Your Lives: ${PLAYER_LIVES_INITIAL} ︱ Enemy's Lives: ${ENEMY_LIVES_INITIAL}`;
    combatArea.textContent = "Combat Area: Empty";
    gameInterfaceStatus.style.borderColor = "";
    enemyInterface.style.borderColor = "";
    endGame.style.display = "none";
    endGameTitle.textContent = "";
    enemyMoveImage.setAttribute("src", "./images/skull.png");

    moveButtons.forEach((moveButton) => {
        moveButton.removeAttribute("disabled");
    });
}
