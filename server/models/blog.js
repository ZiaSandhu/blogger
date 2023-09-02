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
  tag: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String, // You could store the image URL or path here
  },
  isPublished:{
    type: Boolean,
    default: true
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
