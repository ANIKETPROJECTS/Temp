module.exports = {
  apps: [
    {
      name: "cafe-twenty-twenty",
      script: "./dist/index.cjs",
      env: {
        NODE_ENV: "production",
        PORT: 3004,
        MONGODB_URI: "mongodb+srv://mrunaln304_db_user:5aAJKpma893SBqRg@queuecafe.vzczmuh.mongodb.net/shubhamcafe?appName=queuecafe",
        SESSION_SECRET: "GqzNSR4MUH530nWSx315yio6te8okKeQgmKfpXydiqHNPHnt/3fc7xT/G4Z1HshVbk2ntD8g5wZ0DVBiBBvbjg==",
        TWILIO_ACCOUNT_SID: "your_twilio_sid_here",
        TWILIO_AUTH_TOKEN: "your_twilio_token_here",
        TWILIO_PHONE_NUMBER: "your_twilio_phone_number_here",
        DOMAIN: "cafetwentytwenty.com"
      }
    }
  ]
};