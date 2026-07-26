export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message, language, class: className } = req.body;

    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        reply: "GEMINI_API_KEY Vercel Environment Variables mein add nahi hai."
      });
    }

    const prompt = `
You are Ammar AI Learning Bot.

Language: ${language || "Urdu"}
Class: ${className || "All Classes"}

Student Question:
${message}

Answer in a simple, friendly and helpful way.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        reply: data.error?.message || "Google API Error",
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf kijiye, AI se koi jawab nahi mila.";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      reply: "Server Error: " + err.message,
    });
  }
}
