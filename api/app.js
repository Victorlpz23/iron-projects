require('dotenv').config();


const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const mongoose = require('mongoose')

require('./config/db.config');


const app = express();


app.use(express.json())

app.use(logger('dev'));


app.use('/api/v1', require('./config/routes.config'))



app.use((req, res, next) => { next(createError(404, 'Router not found'))})


app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    error = createError(400, error)
  } else if (!error.status) {
    error = createError(500, error);
  }
  console.error(error);

  const data = {
    message: error.message
  }

  if (error.errors) {
    const errors = Object.keys(error.errors)
      .reduce((errors, errorKey) => {
        errors[errorKey] = error.errors[errorKey].message;
        return errors
      }, {});
    data.errors = errors
  }

  res.status(error.status)
    .json(data)
  })




const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Application is running at port ${port}`))