const Student = require('../models/student.model');
const mailer = require('../config/mailer.config');
const createError = require('http-errors');
const jwt = require('jsonwebtoken')


module.exports.list = (req, res, next) => {
  Student.find()
    .populate("projects")
    .then((students) => res.json(students))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  Student.create(req.body)
    .then((student) => {
      mailer.sendConfirmationEmail(student);
      res.status(201).json(student)
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => res.json(req.student)


module.exports.delete = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(createError(403, "Forbidden"));
  }

  Student.deleteOne({ _id: req.user.id })
    .then(() => res.status(204).send())
    .catch(next)
}


module.exports.update = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(createError(403, "Forbidden"));
  }

  Object.assign(req.student, req.body)
  req.student
    .save()
    .then((student) => res.json(student))
    .catch(next)
};

module.exports.confirm = (req, res, next) => {
  req.student.confirm = true;

  req.student
    .save()
    .then((student) => {
      res.redirect(`${process.env.WEB_URL}/login`);
    })
    .catch(next);
};


module.exports.login = (req, res, next) => {
  Student.findOne({ username: req.body.username })
    .then((student) => {
      if (!student) {
        return next(createError(401, "Invalid credentials"));
      }

      if (!student.confirm) {
        return next(createError(401, "Please confirm your account"));
      }

      student.checkPassword(req.body.password).then((match) => {
        if (!match) {
          return next(createError(401, "Invalid credentials"));
        }

        const token = jwt.sign({ sub: student.id, exp: Date.now() / 1000 + 3600 }, 
        process.env.JWT_SECRET 
        );
        res.json({ token })
      });
    })
    .catch(next)
};