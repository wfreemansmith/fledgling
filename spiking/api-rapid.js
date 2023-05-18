const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.RAPID_API_KEY

const api = axios.create({
  baseURL: "https://background-removal.p.rapidapi.com/",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "background-removal.p.rapidapi.com",
  },
});

const removeBackground = (res) => {
  const { image_url } = res;

  return api
    .post("remove", { image_url })
    .then(({ data }) => {
      if (data.error) throw new Error("API error");
      res.image_url = data.response.image_url;
      return res;
    })
    .catch((err) => {
      console.error(`An error occured in removeBackground`);
      console.log(err);
    });
};

module.exports = { removeBackground };
