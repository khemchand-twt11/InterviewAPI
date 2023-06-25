const express = require("express");
const openAiObjective = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");
const { auth } = require("../../middleware/auth");

config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

openAiObjective.get("/Objective/:section", async (req, res) => {
  const { section } = req.params;
  const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Could you please provide me with 5 multiple-choice questions related to ${section}? Each question should be presented in a numbered format and be followed by 4 potential answer options labelled A, B, C, and D. In addition to this, the correct answer should be given in the line immediately following the list of options.
  
          For example, it might look something like this:
          
          Which of the following is a primitive data type in JavaScript?
          A) Number
          B) Array
          C) Object
          D) String
          Correct option: A) Number
          Could you please follow the same format for the rest of the questions related to ${section}?`,
      },
    ],
  });
  let data = chat_completion.data.choices[0].message.content;
  let spliteddata = data.split("\n");
  res.send(spliteddata);
});

module.exports = { openAiObjective };
