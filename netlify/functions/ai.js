export default async (req, context) => {
  try {
    const { message } = await req.json();
    
    let reply = "";
    if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("salam")) {
      reply = "Wa Alaikum Salam! Main Ammar AI hun. Aap kya poochna chahte hain? 😊";
    } else if (message.toLowerCase().includes("name")) {
      reply = "Mera naam Ammar AI hai. Main aap ki madad ke liye hun!";
    } else {
      reply = `Ammar AI: Aap ne kaha "${message}". Ye bohot acha sawal hai!`;
    }

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ reply: "Koi masla aa gaya. Dobara try karein." }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
