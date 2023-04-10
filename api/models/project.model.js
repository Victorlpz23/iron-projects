const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { isValidUrl } = require('../utils/validations')



const projectSchema = new Schema({
  title: {
    type: String,
    required: 'Project name is required',
    minlength: [3, 'Project title needs at least 3 chars']
  },
  description: {
    type: String,
    required: 'Project description is required',
    minlength: [10, 'Project description at least 10 chars']
  },

  tags: [String],
  githubUrl: {
    type: String,
    required: 'Project GitHub is required',
    validate: {
      validator: isValidUrl,
      message: "Not a valid GitHub url"
    }
  },
  imageUrl: {
    type: String,
    required: 'Project image url is required',
    validate: {
      validator: isValidUrl,
      message: "Not a valid image url"
    }
  },
  module: {
    type: Number,
    enum: [1, 2, 3],
    required: 'Project module is required',
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }],
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id
      return ret;
    }
  }
}
);

projectSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "project",
  justOne: false,
});

projectSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "like",
  justOne: false,
});



const Project = mongoose.model('Project', projectSchema);
module.exports = Project