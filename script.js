const startBtn = document.getElementById("startBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const setupScreen = document.getElementById("setupScreen");

startBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden");
    setupScreen.classList.remove("hidden");
});
