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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who authored the blog
    required: true,
  },
  tags: {
    type: String,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  featuredImage: {
    type: String, // You could store the image URL or path here
  },
  isPublished:{
    type: Boolean,
    default: false
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
