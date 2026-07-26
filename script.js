// Ammar AI Learning Script

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");
const sendBtn = document.getElementById("sendBtn");

const welcomeScreen = document.getElementById("welcomeScreen");
const setupScreen = document.getElementById("setupScreen");
const chatScreen = document.getElementById("chatScreen");

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");


// Start Button

startBtn.onclick = function () {
    welcomeScreen.style.display = "none";
    setupScreen.style.display = "flex";
};


// Continue Button

continueBtn.onclick = function () {

    let name = document.getElementById("studentName").value;
    let studentClass = document.getElementById("classSelect").value;
    let language = document.getElementById("languageSelect").value;

    if(name === "" || studentClass === ""){
        alert("Please enter name and class");
        return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("class", studentClass);
    localStorage.setItem("language", language);

    setupScreen.style.display = "none";
    chatScreen.style.display = "block";

    chatBox.innerHTML += `
    <p><b>Ammar AI:</b> Assalamu Alaikum ${name}! 
    How can I help you today?</p>
    `;
};


// Send Message

sendBtn.onclick = async function () {

    let message = userInput.value.trim();

    if(message === "") return;


    chatBox.innerHTML += `
    <p><b>You:</b> ${message}</p>
    `;

    userInput.value = "";


    try {

        let response = await fetch("/api/chat", {

            method: "POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({

                message:
                message +
                "\nYou are Ammar AI Learning, a helpful teacher. Answer students politely. Do not provide adult content."

            })

        });


        let data = await response.json();


        chatBox.innerHTML += `
        <p><b>Ammar AI:</b> ${data.reply}</p>
        `;


    } catch(error){

        chatBox.innerHTML += `
        <p><b>Error:</b> AI response failed</p>
        `;

        console.log(error);

    }

};
