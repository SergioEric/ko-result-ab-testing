const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

const url = "https://api.housecanary.com/v2/property/value";

const API_KEY = process.env.HC_API_KEY;
const API_SECRET = process.env.HC_API_SECRET;

export default async function handler(req, res) {
  console.log('property: ', req);
  
  const { address, zipcode } = req.query;
  if (address == undefined && zipcode == undefined)
    return res.status(400).send("Address and Zipcode is missing");

  if (address == undefined) return res.status(400).send("Address is missing");
  if (zipcode == undefined) return res.status(400).send("Zipcode is missing");

  const params = new URLSearchParams();
  params.append("address", address);
  params.append("zipcode", zipcode);

  const response = await fetch(url + "?" + params, {
    headers: {
      Authorization:
        "Basic " + Buffer.from(API_KEY + ":" + API_SECRET).toString("base64"),
    },
  });
  if (response.status != 200) {
    // not result
    return no_result(res);
  }
  const json = await response.json();

  const property =
    json.length >= 1 ? json[0]["property/value"] : json["property/value"];
  if (property.api_code != 0 || property.result == null) {
    // there's no result for the address
    return no_result(res);
  }
  console.log(property);
  const map = {
    data: true,
    price: property.result.value.price_mean,
    lwr: property.result.value.price_lwr,
    upr: property.result.value.price_upr,
  };
  return res.status(200).json(map);
}

const no_result = (res) => res.status(200).json({ data: false });
