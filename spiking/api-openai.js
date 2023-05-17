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

const generatePrompt = (subject, verb, style) => {
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

  return api
    .post("completions", params)
    .then((res) => {
      const obj = JSON.parse(res.data.choices[0].text);
      return obj;
    })
    .catch((err) => {
      console.error(`An error occurred in generatePrompt: ${err.message}`);
      console.log(err);
    });
};

const generateImage = (res) => {
  const params = {
    prompt: res.prompt,
    n: 1,
    size: "1024x1024",
    response_format: "url",
  };

  // {
  //   "created": 1589478378,
  //   "data": [
  //     {
  //       "url": "https://..."
  //     },
  //     {
  //       "url": "https://..."
  //     }
  //   ]
  // }

  return api
    .post("images/generations", params)
    .then(({ data }) => {
      res.image_url = data.data[0].url;
      return res;
    })
    .catch((err) => {
      console.error(`An error occured in generateImage: ${err.message}`);
      console.log(err);
    });
};

module.exports = { generatePrompt, generateImage };
