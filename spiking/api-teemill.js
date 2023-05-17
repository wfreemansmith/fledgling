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

const generateShirt = (name, description, image_url) => {
  if (!apiKey) {
    console.error(`No API key was found in header`);
    return;
  }

  const params = {
    name: "Squiggly Cats",
    description: "Testing",
    image_url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-bnp0afpJ02bzWExr6F7S5goX/user-lD7xGHcyPB6j25h9KfTRy0Id/img-Pk5RKIU9G9lBCN5xUWrBP058.png?st=2023-05-17T09%3A35%3A27Z&se=2023-05-17T11%3A35%3A27Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-16T23%3A57%3A47Z&ske=2023-05-17T23%3A57%3A47Z&sks=b&skv=2021-08-06&sig=qK/Zz4V78WP2WeAVgu7M/nU0CNSZ4YLnyE24TbTT1Ws%3D",
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

generateShirt()

module.exports = { generateShirt };
