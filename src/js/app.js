const moveVariants = document.querySelectorAll(".game-interface__user-move");
let playerMove = "";
let enemyMove = "";

const enemyMoveImage = document.querySelector(
    ".game-interface__opponent-choose"
);

let round = 0;
const roundCounter = document.querySelector(".game-interface__rounds");

moveVariants.forEach((move) => {
    move.addEventListener("click", () => {
        playerMove = move.getAttribute("id");
        generateRandomEnemyMove();
        round += 1;
        roundCounter.textContent = ` Round: ${round}`;
    });
});

function generateRandomEnemyMove() {
    enemyMove =
        moveVariants[
            Math.floor(0 + Math.random() * (moveVariants.length - 0))
        ].getAttribute("id");

    enemyMoveImage.setAttribute("src", `src/images/${enemyMove}.png`);
}
