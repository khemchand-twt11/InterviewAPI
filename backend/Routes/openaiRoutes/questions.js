const express = require("express");
const OpenAiQuestion = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const {config} =require("dotenv");
const { auth } = require("../../middleware/auth");

config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

OpenAiQuestion.get("/:section",auth,async (req, res) => {
  const { section } = req.params;
  const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Give me 5 question of ${section} ` }],
  });
  let data = chat_completion.data.choices[0].message.content;
  let spliteddata = data.split("\n");
  res.send(spliteddata);
});

module.exports = { OpenAiQuestion };
