const router = require('express').Router()
const {createBlog, getAllBlogs, getBlogById, getBlogByUser} = require('../controllers/blogController')
const {addComment, addReply, getCommentsByBlogId} = require('../controllers/commentController')
router.get('/',(req,res)=>{
    res.json({msg:'Local host 5000'})
})
router.post('/blog',createBlog)
router.get('/blogs',getAllBlogs)
router.get('/blog/:_id',getBlogById)
router.get('/blogs/user/:id', getBlogByUser)

router.post('/addComment',addComment)
router.post('/addReply',addReply)
router.get('/getCommentsByBlog/:id',getCommentsByBlogId)


module.exports = router