export default async (req) => {
  const { message } = await req.json();
  
  // Free AI replies - bina API ke bhi kaam karega
  let reply = "";
  const msg = message.toLowerCase();

  if(msg.includes("2*2") || msg.includes("2×2")){
    reply = "2×2 = 4 hota hai Sir 😊";
  }
  else if(msg.includes("salam") || msg.includes("hello")){
    reply = "Walaikum Salam! Main Ammar AI hun. Aap kaise hain?";
  }
  else if(msg.includes("allah") || msg.includes("iqbal")){
    reply = "Allama Iqbal Pakistan ke qaum ke shair hain. Unka kalam bohot mashoor hai.";
  }
  else if(msg.includes("book") || msg.includes("kitab")){
    reply = "Book Portal me aap Islamic, Story aur Educational books parh sakte hain. Upar 'Book Portal' button dabayen.";
  }
  else if(msg.includes("language") || msg.includes("english")){
    reply = "Language Portal me English aur Urdu seekh sakte hain. Vocabulary aur Grammar wahan milegi.";
  }
  else{
    reply = `Aap ne poocha: "${message}"\n\nMain abhi seekh raha hun. Filhal main basic sawalon ka jawab de sakta hun. Book ya Language portal bhi try karein!`;
  }

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" }
  });
};
