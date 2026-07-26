export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method!== 'POST') return res.status(405).json({reply: "Method not allowed"});

  try {
    const { message, language, class: className } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if(!API_KEY) return res.status(500).json({reply: "Error: GEMINI_API_KEY Vercel me nahi lagi hui"});

    const prompt = `You are Ammar AI Learning Bot for students. 
    Class: ${className || 'All Classes'}. 
    Language: ${language || 'Urdu'}.
    Answer simply and helpfully. Question: ${message}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ 
        contents: [{ parts: [{ text: prompt }] }] 
      })
    });

    const data = await response.json();

    // Agar Google error de
    if(data.error){
      return res.status(500).json({reply: "Google Error: " + data.error.message});
    }

    // Agar jawab mil jaye
    if(data.candidates && data.candidates.length > 0){
      const reply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply });
    } else {
      return res.status(500).json({reply: "AI se jawab nahi mila. Key ya quota check karein."});
    }

  } catch (error) {
    return res.status(500).json({ reply: "Server Error: " + error.message });
  }
}
