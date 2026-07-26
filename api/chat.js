const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");
const sendBtn = document.getElementById("sendBtn");

const welcomeScreen = document.getElementById("welcomeScreen");
const setupScreen = document.getElementById("setupScreen");
const chatScreen = document.getElementById("chatScreen");

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");


startBtn.onclick = () => {

    welcomeScreen.style.display = "none";
    setupScreen.style.display = "flex";

};


continueBtn.onclick = () => {

    let name = document.getElementById("studentName").value;

    if(name === ""){
        alert("Enter your name");
        return;
    }


    setupScreen.style.display = "none";
    chatScreen.style.display = "block";


    chatBox.innerHTML += `
    <p><b>Ammar AI:</b> Welcome ${name}! Ask me anything.</p>
    `;

};



sendBtn.onclick = async () => {


    let message = userInput.value.trim();


    if(message === "") return;


    chatBox.innerHTML += `
    <p><b>You:</b> ${message}</p>
    `;


    userInput.value = "";


    chatBox.innerHTML += `
    <p><b>Ammar AI:</b> Thinking...</p>
    `;



    try {


        const response = await fetch("/api/chat", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify({
                message: message
            })


        });



        const data = await response.json();


        chatBox.innerHTML += `
        <p><b>Ammar AI:</b> ${data.reply || data.error}</p>
        `;



    } catch(error){


        chatBox.innerHTML += `
        <p><b>Error:</b> ${error.message}</p>
        `;


    }


};
