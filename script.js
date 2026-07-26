document.getElementById("sendBtn").onclick = async function () {

    let message = document.getElementById("userInput").value;

    if(message === "") return;

    let chatBox = document.getElementById("chatBox");

    chatBox.innerHTML += `<p><b>You:</b> ${message}</p>`;

    let response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message + 
            "\nAnswer as a helpful AI teacher. Help with education and general questions. Do not provide adult content."
        })
    });

    let data = await response.json();

    chatBox.innerHTML += `<p><b>Ammar AI:</b> ${data.reply}</p>`;

    document.getElementById("userInput").value = "";
};
