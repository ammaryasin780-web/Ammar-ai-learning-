export default async (req) => {
  const { message } = await req.json();
  const msg = message.toLowerCase().trim();
  let reply = "";

  // 1. Adult / Galat baat filter
  const badWords = ["sex", "adult", "porn", "nanga"];
  if(badWords.some(word => msg.includes(word))){
    reply = "Main is qism ke sawalon ka jawab nahi de sakta. Kya aap kisi taleemi ya deeni topic pe baat karna chahenge?";
  }

  // 2. Math
  else if(msg.includes("+") || msg.includes("-") || msg.includes("×") || msg.includes("*") || msg.includes("/")){
    try{
      const ans = eval(msg.replace("×","*"));
      reply = `Iska jawab hai: ${ans} 😊`;
    } catch {
      reply = "Math samajh nahi aaya. Dobara likhein jaise 2+2";
    }
  }

  // 3. General Knowledge
  else if(msg.includes("iqbal")){
    reply = "Allama Iqbal Pakistan ke qaum ke shair aur falsafi hain. Unki mashoor kitaab 'Bang-e-Dara' hai. 'Lab pe aati hai dua' bhi unki dua hai.";
  }
  else if(msg.includes("pakistan")){
    reply = "Pakistan 14 August 1947 ko bana. Darulhukumat Islamabad hai. Qaum e Tarana: 'Pak sar zameen shad bad'";
  }
  else if(msg.includes("kya") || msg.includes("kya hai") || msg.includes("konsa") || msg.includes("kaun")){
    reply = `Aap ne "${message}" poocha. Main koshish karunga madad karne ki. Kya aap thora tafseel se bata sakte hain taake main behtar jawab dun?`;
  }

  // 4. Greetings
  else if(msg.includes("salam") || msg.includes("hello") || msg.includes("hi")){
    reply = "Walaikum Salam! Main Ammar AI hun. Aaj main aap ki kya madad kar sakta hun?";
  }
  else if(msg.includes("shukriya") || msg.includes("thanks")){
    reply = "Khush aamdeed Sir! 😊 Aur kuch poochna hai?";
  }

  // 5. Default - ab "seekh raha hun" nahi bolega
  else{
    reply = `Aap ne kaha: "${message}"\n\nMain aap ki baat samajh gaya. Kya aap is topic pe aur baat karna chahenge? Ya Book/Language portal check karein upar se.`;
  }

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" }
  });
};
