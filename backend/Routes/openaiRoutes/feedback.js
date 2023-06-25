const express = require("express");
const openAiFeedback = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");
const { auth } = require("../../middleware/auth");

config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

openAiFeedback.post("/feedback", async (req, res) => {
  const { Question, Answer } = req.body;
  if (!Answer) {
    res.send({
      content:
        "You have not answered this question Please answer and then try again.",
    });
  } else if (Answer.length <= 60) {
    res.send({
      content:
        "Your answer is too short for feedback. Please provide answer between 100 to 200 words.",
    });
  } else {
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Please provide your feedback on the answer to the question: '${Question}'. Answer: '${Answer}'. In 2 lines, please share your feedback. On a scale of 1 to 10 in another line using /n, how would you rate this answer? `,
        },
      ],
    });
    res.send(chat_completion.data.choices[0].message);
  }
});

module.exports = { openAiFeedback };
