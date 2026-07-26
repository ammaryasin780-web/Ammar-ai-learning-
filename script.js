alert("Continue button clicked");

document.getElementById("startBtn").onclick = function () {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("setupScreen").style.display = "flex";
};


document.getElementById("continueBtn").onclick = function () {

    let name = document.getElementById("studentName").value;
    let studentClass = document.getElementById("classSelect").value;
    let language = document.getElementById("languageSelect").value;

    if (name === "" || studentClass === "") {
        alert("Please enter your name and select class");
        return;
    }

    document.getElementById("setupScreen").style.display = "none";
    document.getElementById("chatScreen").style.display = "block";

    console.log("Name:", name);
    console.log("Class:", studentClass);
    console.log("Language:", language);
};
