const request = require("request");
const fetch = require("node-fetch");

const { URLSearchParams } = require("url");

const url = "https://api.housecanary.com/v2/property/value_analysis/check?";
// const url = "https://api.housecanary.com/v2/property/rental_value";

const API_KEY = "MZ38Z32Q4CGQ583A9AH5";
const API_SECRET = "hPVzzEhS6dbknQk7Zjqw1L4GBWa73tlx";

const params = new URLSearchParams();

params.append("address", "1010 Tall Timbers Rd");
params.append("zipcode", "75645");

fetch(url + params, {
  headers: {
    Authorization:
      "Basic " + Buffer.from(API_KEY + ":" + API_SECRET).toString("base64"),
  },
})
  .then((res) => res.json())
  .then((json) => console.log(typeof json));

// request.get(
//   {
//     url: url,
//     auth: {
//       user: API_KEY,
//       pass: API_SECRET,
//     },
//     qs: {
//       //   slug: "65239-Rosanne-Prairie-Bayardchester-CA-90113 ",
//       address: "1010 Tall Timbers",
//       zipcode: "75645",
//     },
//   },
//   function (error, response, body) {
//     console.log(body);
//   }
// );
