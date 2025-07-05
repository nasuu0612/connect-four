const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

function showOnly(screenToShow) {
  const screens = [startScreen, gameScreen];
  screens.forEach(screen => {
    screen.classList.remove("visible", "hidden");
    if (screen === screenToShow) {
      screen.classList.add("visible");
    } else {
      screen.classList.add("hidden");
    }
  });
}


export function showStartScreen() {
  showOnly(startScreen);
}

export function showGameScreen() {
  showOnly(gameScreen);
}
