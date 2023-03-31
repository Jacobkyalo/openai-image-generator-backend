const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// OPENAI CONFIGURATION
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// APP INIT
const app = express();
const PORT = process.env.PORT || 5000;

// EXPRESS MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APP POST ENDPOINT
app.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 4,
      size: "1024x1024",
    });
    const imageURLS = response.data.data;
    res.status(200).json({ images: imageURLS });
  } catch (error) {
    res.status(500).json({ error: "Sorry, something went wrong! ☹️" });
  }
});

// APP LISTENING
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
