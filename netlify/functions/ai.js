exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  
  // Abhi ke liye simple reply. Baad me yahan real AI lagayenge
  const reply = `Ammar AI: Aap ne kaha "${message}". Main theek hun, shukriya!`;

  return {
    statusCode: 200,
    body: JSON.stringify({ reply }),
  };
};
