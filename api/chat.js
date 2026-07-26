export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { message } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY missing"
      });
    }


    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 
                  "You are Ammar AI Learning. Help students with study and general questions. Avoid adult content.\n\nUser: " 
                  + message
                }
              ]
            }
          ]
        })
      }
    );


    const data = await response.json();


    if (data.error) {
      return res.status(500).json({
        error: data.error.message
      });
    }


    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text;


    res.status(200).json({
      reply: reply || "No reply generated"
    });


  } catch(error) {

    res.status(500).json({
      error: error.message
    });

  }

}
