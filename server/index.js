import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();

env.config();

app.use(cors());
app.use(bodyParser.json());

// Configure open api
const configuration = new Configuration({
  apiKey: process.env.API_KEY, // VISIT .env AND MAKE CHANGES
});
const openai = new OpenAIApi(configuration);

// listeninng
app.listen("3080", () => console.log("listening on port 3080"));

// dummy route to test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//post route for making requests
app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      temperature: 0,
      max_tokens: 4000,
      top_p: 0,
      frequency_penalty: 2,
      presence_penalty: 2,
    });
    res.json({ message: response.data.choices[0].text });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
