const Like = require('../models/like.model')

module.exports.toggle = (req, res, next) => {
  const params = {
    project: req.params.id,
    student: req.user.id
  };

  Like.findOne(params)
    .then((like) => {
      if (like) {
        return Like.deleteOne({ _id: like.id });
      } else {
        return Like.create(params);
      }
    })
    .then((like) => res.json(like))
    .catch(next)

};

