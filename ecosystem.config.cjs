module.exports = {
  apps: [
    {
      name: "cafe-twenty-twenty",
      script: "./dist/index.cjs",
      env: {
        NODE_ENV: "production",
        PORT: 3004,
        MONGODB_URI: "your_mongodb_uri_here",
        SESSION_SECRET: "your_session_secret_here",
        TWILIO_ACCOUNT_SID: "your_twilio_sid_here",
        TWILIO_AUTH_TOKEN: "your_twilio_token_here",
        TWILIO_PHONE_NUMBER: "your_twilio_phone_number_here",
        DOMAIN: "cafetwentytwenty.com"
      }
    }
  ]
};