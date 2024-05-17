const { NextChat } = require("nextchat");
const next = new NextChat("nextchat_XM2th5q1uPC7eB0Yn8WjZKrD");

exports.name = '/gpt5';
exports.index = async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    return res.status(400).send({ error:"Provide a prompt"});
  }

  next.gpt(prompt).then((response) => {
    const jsonResponse = { respond: response.message };
    res.json(jsonResponse);
  }).catch((error) => {
    res.status(500).send("An error occurred: " + error.message);
  });
};
