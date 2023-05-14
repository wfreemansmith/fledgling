const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-bnp0afpJ02bzWExr6F7S5goX",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getPrompt = async (subject = "cat", verb = "swimming", style = "wes anderson") => {
  const body = {
    model: "text-davinci-003",
    prompt: `I'm going to provide a subject, a verb and an art style. Use these to generate a prompt DALL-E and return this as a JSON object with the properties "prompt", "description", "title" and "keywords". "description" should be marketing copy for a t-shirt bearing the image, "title" is the title of the t-shirt, and "keywords" is an array of keywords. Do not mention the style in the description.

    Subject: ${subject}
    Verb: ${verb}
    Style: ${style}`,
    max_tokens: 500,
    temperature: 0.7,
  };
  const res = await openai.createCompletion(body);
  const obj = JSON.parse(res.data.choices[0].text);

  return obj;
};

module.exports = { getPrompt };
