require("dotenv").config();
const { completion } = require("../.prompts.js");
const axios = require("axios");

const apiKey = process.env.OPENAI_API_KEY;

const api = axios.create({
  baseURL: "https://api.openai.com/v1/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "OpenAI-Organization": "org-bnp0afpJ02bzWExr6F7S5goX",
  },
});

const getPrompt = (subject, verb, style) => {
  if (!apiKey) {
    console.error(`No API key was found in header`);
    return;
  }

  const params = {
    model: "text-davinci-003",
    prompt: completion(subject, verb, style),
    max_tokens: 500,
    temperature: 0.7,
  };

  api
    .post("completions", params)
    .then((res) => {
      console.log(JSON.parse(res.data.choices[0].text));
      return JSON.parse(res.data.choices[0].text);
    })
    .catch((err) => {
      console.error(`An error occurred: ${err.message}`);
    });
};

module.exports = { getPrompt };
