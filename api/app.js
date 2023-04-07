require('dotenv').config();


const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');

require('./config/db.config');


const app = express();

app.use(logger('dev'));


app.use('/api/v1', require('./config/routes.config'))



app.use((req, res, next) => { next(createError(404, 'Router not found'))})


app.use((error, req, res, next) => {
  if (!error.status) {
    error = createError(500, error);
  }

  const data = {
    message: error.message
  }

  res.status(error.status)
    .json(data)
  })




const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Application is running at port ${port}`))