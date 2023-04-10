
module.exports.cleanBody = (req, res, next) => {
  if (req.body) {
    delete req.body._id;
    delete req.body.author;
    delete req.body.createdAt;
    delete req.body.updatedAt;
  }
  next();
};