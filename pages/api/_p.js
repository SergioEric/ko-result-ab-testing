// const request = require("request");
// const url = "https://api.housecanary.com/v2/property/value_analysis/check";

// const API_KEY = process.env.API_KEY;
// const API_SECRET = process.env.API_SECRET;

// export default function handler(req, res) {
//   const { address, zipcode } = req.query;
//   if (address == undefined && zipcode == undefined)
//     return res.status(400).send("Address and Zipcode is missing");

//   if (address == undefined) return res.status(400).send("Address is missing");
//   if (zipcode == undefined) return res.status(400).send("Zipcode is missing");
//   request.get(
//     {
//       url: url,
//       auth: {
//         user: API_KEY,
//         pass: API_SECRET,
//       },
//       qs: {
//         address: address,
//         zipcode: zipcode,
//       },
//     },
//     function (error, response, body) {
//       console.log(body);
//       // TODO handling correctly the error with a custom message
//       if (error) return res.status(404).send(error);

//       // check for "All pre-analysis checks passed"
//       // ? Parsed the body(string resp) into JSON
//       const parsedJSON = JSON.parse(body);
//       console.log(parsedJSON.code);
//       if (parsedJSON.code != undefined && parsedJSON.code == 404) {
//         //Sorry, we cannot find this address
//         return res.status(404).json({
//           message: parsedJSON.code_description.message,
//         });
//       }

//       const checks = parsedJSON.checks;

//       console.log(`checks: ${checks["All pre-analysis checks passed"]}`);
//       if (!checks["All pre-analysis checks passed"] ?? true) {
//         // the adddres dosen't have an estimated value
//         return res
//           .status(404)
//           .send("The Adddres doesn't have an estimated value");
//       }
//       if (body) return res.status(200).json(body);
//     }
//   );
// }
