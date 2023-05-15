const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const completion = require("../.prompts.js")
const axios = require("axios");

const apiKey = process.env.OPENAI_API_KEY

const api = axios.create({
  baseURL: "https://api.openai.com/v1/",
  headers: {
    "Application": "application/json",
    "Authorisation": `Bearer ${apiKey}`,
    "OpenAI-Organization": "org-bnp0afpJ02bzWExr6F7S5goX"
  },
})

const getPrompt = async (subject = "cat", verb = "swimming", style = "photorealistic") => {
  if (!configuration.apiKey) {
    console.error(`No API key was found in Header`)
    // return error?
  }

  const params = {
    model: "text-davinci-003",
    prompt: completion,
    max_tokens: 500,
    temperature: 0.7,
  };
  
  api.post(`completions`, params).then((res) => {
    console.log(JSON.parse(res.data.choices[0].text))
  }).catch((err) => {
    console.error(`An error occurred: ${error.message}`)
  })
};

getPrompt()

module.exports = { getPrompt };
