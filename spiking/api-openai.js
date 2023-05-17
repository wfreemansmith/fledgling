require("dotenv").config();
const { completion } = require("../.prompts.js");
const axios = require("axios");
const generateShirt = require("./api-teemill.js")

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

  api
    .post("completions", params)
    .then((res) => {
      const obj = JSON.parse(res.data.choices[0].text);
      console.log(obj)
      // generateImage(obj.prompt)
      return obj;
    })
    .catch((err) => {
      console.error(`An error occurred: ${err.message}`);
    });
};

const generateImage = (prompt) => {
const params = {
  prompt,
  n: 4,
  size: "1024x1024",
  response_format: "url"
}

api.post("images/generations", params).then(({data}) => {
  console.log(data.data)
}).catch((err) => {
  console.log(err)
  console.error(`An error occured: ${err.message}`)
})
}

generatePrompt("Boat", "Diving into the sea", "surrealistic")

module.exports = { generatePrompt, generateImage };
