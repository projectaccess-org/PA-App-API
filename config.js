require('dotenv').load();
module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  mongodb: process.env.NODE_ENV === "production" ? {
    URI: process.env.MONGODB_URI
  } : {
    URI: 'mongodb://localhost/mentor-mongodb'
  },
  s3: {
    bucketName: "mentor-app-assets"
  },
  AWS: {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY
  },
  sendbird: {
    API_ID: process.env.SENDBIRD_ID,
    API_TOKEN:process.env.SENDBIRD_TOKEN,
  },
  JWT_SECRET: "AWorldWherePassionAndPotential2019",
  UI_URL: process.env.UI_URL,
  PROD_MODE: process.env.NODE_ENV === "production",
  EMAIL_ON: true,
  corsOptions: {
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://dev.app.projectaccess.org',
      'https://dev.app.projectaccess.org'
    ]
  }
};