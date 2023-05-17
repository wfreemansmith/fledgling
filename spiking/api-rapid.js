const axios = require("axios");
require("dotenv").config();

const api = axios.create({
  baseURL: "https://background-removal.p.rapidapi.com/",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "0871ce2644msh81e1009e9234346p1a7d26jsn222b02914533",
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
