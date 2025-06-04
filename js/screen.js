const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

export function showStartScreen(){
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
}

export function showGameScreen(){
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
}