const { generatePrompt, generateImage } = require("./api-openai");
const { removeBackground } = require("./api-rapid");
const { generateShirt } = require("./api-teemill");

function apiCalls(subject, verb, style) {
  generatePrompt(subject, verb, style)
    .then((res) => {
      console.log("Prompt generated!");
      console.log(res);
      return generateImage(res);
    })
    .then((res) => {
      console.log("Image generated!");
      console.log(res);
      return removeBackground(res);
    })
    .then((res) => {
      console.log("Background removed!");
      console.log(res);
      return generateShirt(res);
    })
    .then((res) => {
      console.log("Shirt generated!");
      console.log(res);
    })
    .catch((err) => {
      console.error("error in API chain");
      console.log(err);
    });
}

apiCalls("marilyn monroe", "taking a selfie", "pop art")