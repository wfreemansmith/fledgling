require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.TEEMILL_PUBLIC_KEY;
const mockserver = "https://stoplight.io/mocks/teemill/public-api/100107594/";
const liveserver = "https://teemill.com/omnis/v3/";

const api = axios.create({
  baseURL: liveserver,
  headers: {
    "Content-Type": "application/json",
    "Accept": 'application/json, text/html',
    "Authorization": `Bearer ${apiKey}`,
  },
});

// https://labs.openai.com/s/oybECbTn1LC9u4WEXVPgrMVU
// Item codes: https://teemill.com/omnis/v3/product/options/

const getShirt = (name, description, image_url) => {
  if (!apiKey) {
    console.error(`No API key was found in header`);
    return;
  }

  const params = {
    name: "Squiggly Cats",
    description: "Testing",
    image_url: "https://c8.alamy.com/comp/K75HF5/square-linear-cats-vector-illustration-funny-cartoon-flat-cool-character-K75HF5.jpg",
    colours: "Mauve,Pink,Mustard,Denim Blue,White,Black,Bright Blue",
    item_code: "RNA1",
    price: "19.00",
  };

  api
    .post("product/create", params)
    .then(({data}) => {
      console.log(data)
      return data
    })
    .catch((err) => {
      console.log(err)
      console.error(`The following error occurred: ${err.message}`);
    });
};

module.exports = { getShirt };
