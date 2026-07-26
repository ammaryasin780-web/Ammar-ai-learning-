export default async (req) => {
  const { message } = await req.json();
  const API_KEY = process.env.GEMINI_API_KEY;

  // Adult filter
  const badWords = ["sex", "adult", "porn", "nanga"];
  if(badWords.some(word => message.toLowerCase().includes(word))){
    return new Response(JSON.stringify({ reply: "Main is qism ke sawalon ka jawab nahi de sakta." }), {headers:{"Content-Type":"application/json"}});
  }

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Tum Ammar AI ho. Urdu me jawab do. Adult ho to mana kar do. Sawal: ${message}` }]
    })
  });
  
  const data = await res.json();
  const reply = data.candidates[0].content.parts[0].text;

  return new Response(JSON.stringify({ reply }), {headers:{"Content-Type":"application/json"}});
};
