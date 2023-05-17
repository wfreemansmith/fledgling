require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.TEEMILL_PUBLIC_KEY;
const mockserver = "https://stoplight.io/mocks/teemill/public-api/100107594/";
const liveserver = "https://teemill.com/omnis/v3/";

const api = axios.create({
  baseURL: liveserver,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/html",
    Authorization: `Bearer ${apiKey}`,
  },
});

// https://labs.openai.com/s/oybECbTn1LC9u4WEXVPgrMVU
// Item codes: https://teemill.com/omnis/v3/product/options/

const generateShirt = (res) => {
  const { name, description, image_url } = res;

  if (!apiKey) {
    console.error(`No API key was found in header`);
    return;
  }

  const params = {
    name,
    description,
    image_url,
    colours: "Mauve,Pink,Mustard,Denim Blue,White,Black,Bright Blue",
    item_code: "RNA1",
    price: "19.00",
  };

  return api
    .post("product/create", params)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(`An error occurred in generateShirt: ${err.message}`);
      console.log(err);
    });
};

module.exports = { generateShirt };
