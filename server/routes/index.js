const router = require('express').Router()
const {createBlog, getAllBlogs, getBlogById, getBlogByUser} = require('../controllers/blogController')
const {addComment, addReply, getCommentsByBlogId} = require('../controllers/commentController')
// const { auth } = require('express-oauth2-jwt-bearer');
const auth = require('../middleware/auth')
// const checkJwt = auth()

router.get('/',(req,res)=>{
    res.json({msg:'Local host 5000'})
})
router.post('/blog',auth,createBlog)
router.get('/blogs',getAllBlogs)
router.get('/blog/:_id',getBlogById)
router.get('/blogs/user/:id', getBlogByUser)

router.post('/addComment',auth,addComment)
router.post('/addReply',auth,addReply)
router.get('/getCommentsByBlog/:id',getCommentsByBlogId)


module.exports = router