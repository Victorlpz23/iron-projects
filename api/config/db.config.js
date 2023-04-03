const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/iron-projects';

mongoose.connect(MONGODB_URI)
  .then(() => console.info(`Succesfully connect to the database ${MONGODB_URI}`))
  .catch(() => console.error("An error ocurred trying to connect to the databse", error))