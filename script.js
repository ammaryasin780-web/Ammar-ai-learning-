alert("Continue button clicked");
document.getElementById("startBtn").onclick = function () {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("setupScreen").style.display = "flex";
};
