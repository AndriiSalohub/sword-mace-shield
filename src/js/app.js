const moveVariants = document.querySelectorAll(".game-interface__user-move");
let playerMove = "";
let enemyMove = "";

moveVariants.forEach((move) => {
    move.addEventListener("click", (e) => {
        playerMove = move.getAttribute("id");
    });
});

function generateRandomEnemyMove() {
    enemyMove =
        moveVariants[
            Math.floor(0 + Math.random() * (moveVariants.length - 0))
        ].getAttribute("id");
    console.log(enemyMove);
}
