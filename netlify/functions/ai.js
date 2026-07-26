export default async (req) => {
  const { message } = await req.json();
  let reply = `Ammar AI: Aap ne kaha "${message}"\n\nMain aap ki har baat ka jawab dunga!`;
  return new Response(JSON.stringify({ reply }), {headers:{"Content-Type":"application/json"}});
};
