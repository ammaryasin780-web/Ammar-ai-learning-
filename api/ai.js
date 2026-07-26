export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method!== 'POST') return res.status(405).json({reply: "Method not allowed"});

  try {
    const { message } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if(!API_KEY) {
      return res.status(500).json({reply: "Error: API Key nahi lagi hui"});
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ reply });
    
  } catch (error) {
    return res.status(500).json({ reply: "Error: " + error.message });
  }
}
