const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  content: {type:String},
  user: Object,
  replies: {
    type: [this],
    default: []
  },
}, { timestamps: true });

const CommentSchema = new mongoose.Schema({
  content: String,
  user: Object,
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  replies: { type: [replySchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);

