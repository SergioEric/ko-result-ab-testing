module.exports = {
  target: "serverless",
  env: {
    HC_API_SECRET: process.env.HC_API_SECRET,
    HC_API_KEY: process.env.HC_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_API: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    NEXT_PUBLIC_UA_TRACKING_ID: process.env.NEXT_PUBLIC_UA_TRACKING_ID,
  },
};
