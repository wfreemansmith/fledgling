const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
require("dotenv").config();
const completion = require("../.prompts.js")

const configuration = new Configuration({
  organization: "org-bnp0afpJ02bzWExr6F7S5goX",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getPrompt = async (subject = "cat", verb = "swimming", style = "photorealistic") => {
  if (!configuration.apiKey) {
    console.log(configuration)
  }
  const req = {
    model: "text-davinci-003",
    prompt: completion,
    max_tokens: 500,
    temperature: 0.7,
  };

  try {
    res.status(200)
    // const res = await openai.createCompletion(req);
    // const obj = JSON.parse(res.data.choices[0].text);
  } catch(error) {
    console.error(error.message)
    // response.status: 500
  }

  // return obj;
};

getPrompt()

module.exports = { getPrompt };
