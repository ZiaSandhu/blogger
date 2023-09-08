const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  readTime: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  thumbnail: {
    type: String, 
  },
  isPublished:{
    type: Boolean,
    default: true
  }
},{timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
