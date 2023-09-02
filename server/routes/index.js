const router = require('express').Router()
const auth = require('../middleware/auth')
// const {upload} = require('../middleware/fileUpload')
const {createBlog, getAllBlogs, getBlogById} = require('../controllers/blogController')
const {addComment, addReply, getCommentsByBlogId} = require('../controllers/commentController')
router.get('/',(req,res)=>{
    res.json({msg:'Local host 5000'})
})
router.post('/blog',createBlog)
router.get('/blogs',getAllBlogs)
router.get('/blog/:_id',getBlogById)
router.get('/blog/user/:id',(req,res)=>{
    let userId = req.params
    res.json({msg: 'get blog by users', userId})
})

router.post('/addComment',addComment)
router.post('/addReply',addReply)
router.get('/getCommentsByBlog/:id',getCommentsByBlogId)


module.exports = router