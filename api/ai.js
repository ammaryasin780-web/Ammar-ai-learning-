export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).end();
  
  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  // Adult filter
  const badWords = ["sex", "adult", "porn", "nanga"];
  if(badWords.some(word => message.toLowerCase().includes(word))){
    return res.status(200).json({ reply: "Main is qism ke sawalon ka jawab nahi de sakta." });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Tum Ammar AI ho. Urdu me 2-3 line me dostana jawab do. Sawal: ${message}` }]
      })
    });
    
    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Error aa gaya. Key check karein." });
  }
}
