const Student = require('../models/student.model');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');


module.exports.cleanBody = (req, res, next) => {
  // protect some body fields from being sent

  if (req.body) {
    delete req.body._id;
    delete req.body.author;
    delete req.body.createdAt;
    delete req.body.updatedAt;
    delete req.body.confirm;
  }
  next();
};

module.exports.auth = (req, res, next) => {
  const token = req.headers.authoritation.split(" ")[1];

  if (!token) {
    return next(createError(401, "Missing Authorization token"))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    Student.findById(decoded.sub)
      .then((student) => {
        if (student) {
          req.user = student
          next();
        } else {
          next(createError(401, "Student not found"));
        }
      })
      .catch(next)
  } catch (err) {
    next(createError(401, "Invalid token"))
  }
};