const Comment = require('../models/comment.model');
const createError = require('http-errors');

module.exports.exists = (req, res, next) => {
  const commentId = req.params.commentId || req.params.id;
  
  Comment.findById(commentId)
    .then((comment) => {
      if(comment) {
        req.comment = comment
        next()
      } else {
        next(createError(404, 'Comment not found'))
      }
    })
    .catch(next)
}