const Joi = require('joi')
const Comment = require('../models/comment');

const IdPattern = /^[a-fA-F0-9]{24}$/

function findObjectById(root, idToFind) {
    // Base case: If the current object has the desired ID, return it
    if (root.id === idToFind) {
      return root;
    }
  
    // Check if the current object has a 'replies' array
    if (root.replies && Array.isArray(root.replies)) {
      // Iterate through the 'replies' array recursively
      for (const reply of root.replies) {
        // Recursive call to search within the nested replies
        const foundObject = findObjectById(reply, idToFind);
        if (foundObject) {
          return foundObject; // If found, return the object
        }
      }
    }
  
    // If the ID is not found in the current object or its replies, return null
    return null;
  }

const addComment = async (req,res,next) => {

    const addCommentSchema = Joi.object({
        user: Joi.object().required(),
        content: Joi.string().required(),
        blogId: Joi.string().regex(IdPattern).required()

    });
    const {error} = addCommentSchema.validate(req.body)

    if(error){
        return next(error)
    }

    const {content, user, blogId} = req.body

    try {
        const newComment = new Comment({
            user,
            content,
            blogId
        });
         await newComment.save()
    } catch (error) {
        return next(error)
    }
    res.status(201).json({msg: 'Comment added Successfully'})
}
const addReply = async (req,res,next) => {

    const addCommentSchema = Joi.object({
        user: Joi.object().required(),
        content: Joi.string().required(),
        mainComment: Joi.string().regex(IdPattern).required(),
        parentComment: Joi.string().regex(IdPattern).required()

    });
    const {error} = addCommentSchema.validate(req.body)

    if(error){
        return next(error)
    }

    const {content, user, mainComment, parentComment} = req.body

    // save to database
    let comment
    try {
        comment = await Comment.findOne({ _id: mainComment })
        let object = findObjectById(comment, parentComment)
        object.replies.push({content,user})
        await comment.save()
    } catch (error) {
        return next(error)
    }
    res.status(201).json({msg: 'Successfully Replied'})
    
}


const getCommentsByBlogId = async(req,res,next) => {
    const blogId = req.params.id
    try {
        let query = Comment.find({blogId})
        query.sort({'createdAt': -1});
        let comments = await query.exec()
        res.status(200).json({msg: 'Get comments of blog',comments})
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    addComment,
    addReply,
    getCommentsByBlogId
}