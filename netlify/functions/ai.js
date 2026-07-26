const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => { if(e.key === "Enter") sendMessage() });

async function sendMessage() {
  const message = userInput.value.trim();
  if(!message) return;

  chatBox.innerHTML += `<div><b>Aap:</b> ${message}</div>`;
  userInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch('/api/ai', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatBox.innerHTML += `<div><b>AI:</b> ${data.reply}</div>`;
  } catch (error) {
    chatBox.innerHTML += `<div><b>AI:</b> Error aa gaya. Server check karein.</div>`;
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}
