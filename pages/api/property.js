const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

const url = "https://api.housecanary.com/v2/property/value_analysis/check";

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

export default function handler(req, res) {
  const { address, zipcode } = req.query;
  if (address == undefined && zipcode == undefined)
    return res.status(400).send("Address and Zipcode is missing");

  if (address == undefined) return res.status(400).send("Address is missing");
  if (zipcode == undefined) return res.status(400).send("Zipcode is missing");

  const params = new URLSearchParams();
  params.append("address", address);
  params.append("zipcode", zipcode);

  fetch(url + "?" + params, {
    headers: {
      Authorization:
        "Basic " + Buffer.from(API_KEY + ":" + API_SECRET).toString("base64"),
    },
  })
    .then((res) => res.json())
    .then(function (json) {
      console.log(json);
      console.log(typeof json); //-> object, meaning we don't need to parse as a JSON object

      // check for "All pre-analysis checks passed"
      if (json.code != undefined && json.code == 404) {
        //Sorry, we cannot find this address
        return res.status(404).json({
          message: json.code_description.message,
        });
      }

      const checks = json.checks;

      console.log(`checks: ${checks["All pre-analysis checks passed"]}`);
      if (!checks["All pre-analysis checks passed"] ?? true) {
        // the adddres dosen't have an estimated value
        return res
          .status(404)
          .send("The Adddres doesn't have an estimated value");
      }
      if (json) return res.status(200).json(json);
    })
    // TODO handling correctly the error with a custom message
    .catch((error) => res.status(404).send(error));
}
