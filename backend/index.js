const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const { config } = require("dotenv");
const cors = require("cors");
const { Register } = require("./Routes/userRoutes/register");
const { Login } = require("./Routes/userRoutes/login");

const {
  openAiObjective,
} = require("./Routes/openaiRoutes/objectivetypequestions");
const { OpenAiQuestion } = require("./Routes/openaiRoutes/questions");
const { openAiFeedback } = require("./Routes/openaiRoutes/feedback");
const { connection } = require("./Connection/Mongooseconnection");
const {auth} = require("./middleware/auth");

const app = express();
app.use(cors());

config();

app.use(express.json());



app.get("/", async (req, res) => {
  res.send("hello How can I help You");
});

app.use("/", Register);
app.use("/", Login);


app.use("/Openai", openAiObjective);
app.use("/Openai", OpenAiQuestion);
app.use("/Openai", openAiFeedback);

app.listen(3000, async () => {
  try {
    await connection;
    console.log("App is connected to database");
  } catch (error) {
    console.log(error);
  }
});
