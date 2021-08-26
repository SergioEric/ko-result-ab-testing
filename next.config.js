module.exports = {
  target: "serverless",
  reactStrictMode: true,
  env: {
    HC_API_SECRET: process.env.HC_API_SECRET,
    HC_API_KEY: process.env.HC_API_KEY,
  },
};
