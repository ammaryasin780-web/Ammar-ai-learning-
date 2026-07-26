const welcomeScreen = document.getElementById("welcomeScreen");
const setupScreen = document.getElementById("setupScreen");
const chatScreen = document.getElementById("chatScreen");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");
const sendBtn = document.getElementById("sendBtn");

const studentName = document.getElementById("studentName");
const classSelect = document.getElementById("classSelect");
const languageSelect = document.getElementById("languageSelect");

const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

let currentName = "";
let currentClass = "";
let currentLanguage = "Urdu";

// Start Button
startBtn.onclick = () => {
    welcomeScreen.classList.add("hidden");
    setupScreen.classList.remove("hidden");
};

// Continue Button
continueBtn.onclick = () => {

    if(studentName.value.trim()==""){
        alert("Please enter your name.");
        return;
    }

    if(classSelect.value==""){
        alert("Please select your class.");
        return;
    }

    currentName = studentName.value.trim();
    currentClass = classSelect.value;
    currentLanguage = languageSelect.value;

    localStorage.setItem("studentName",currentName);
    localStorage.setItem("studentClass",currentClass);
    localStorage.setItem("studentLanguage",currentLanguage);

    setupScreen.classList.add("hidden");
    chatScreen.classList.remove("hidden");

    addMessage("AI","👋 Welcome "+currentName+"! How can I help you today?");
};

sendBtn.onclick = sendMessage;

userInput.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        sendMessage();
    }
});function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    addMessage("You", message);

    userInput.value = "";

    const typing = document.createElement("div");
    typing.className = "message ai";
    typing.id = "typing";
    typing.innerHTML = "🤖 Typing...";
    chatBox.appendChild(typing);

    chatBox.scrollTop = chatBox.scrollHeight;

    fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message,
            language: currentLanguage,
            class: currentClass,
            name: currentName
        })
    })
    .then(res => res.json())
    .then(data => {

        document.getElementById("typing").remove();

        addMessage("AI", data.reply);

        saveHistory("You", message);
        saveHistory("AI", data.reply);

    })
    .catch(() => {

        document.getElementById("typing").remove();

        addMessage("AI", "❌ Server se rabta nahi ho saka.");

    });

}

function addMessage(sender, text) {

    const div = document.createElement("div");

    div.className = sender === "You"
        ? "message user"
        : "message ai";

    div.innerHTML = `<b>${sender}</b><br>${text}`;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

}

function saveHistory(sender, text) {

    let history =
    JSON.parse(localStorage.getItem("chatHistory")) || [];

    history.push({
        sender,
        text
    });

    localStorage.setItem(
       // ===== Load History =====

function loadHistory() {

    chatBox.innerHTML = "";

    const history = JSON.parse(localStorage.getItem("chatHistory")) || [];

    history.forEach(item => {
        addMessage(item.sender, item.text);
    });

}

// ===== Welcome Back =====

window.onload = () => {

    const savedName = localStorage.getItem("studentName");
    const savedClass = localStorage.getItem("studentClass");
    const savedLanguage = localStorage.getItem("studentLanguage");

    if(savedName) studentName.value = savedName;
    if(savedClass) classSelect.value = savedClass;
    if(savedLanguage) languageSelect.value = savedLanguage;

};

// ===== Clear Chat =====

function clearHistory(){

    if(confirm("Clear chat history?")){

        localStorage.removeItem("chatHistory");

        chatBox.innerHTML="";

        addMessage("AI","👋 Chat history cleared.");

    }

}

// ===== Auto Focus =====

userInput.addEventListener("focus",()=>{

    chatBox.scrollTop = chatBox.scrollHeight;

});

// ===== Open Chat =====

continueBtn.addEventListener("click",()=>{

    set
