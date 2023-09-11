const Joi = require('joi')
const fs = require('fs') // built in file system module
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const { BASE_URL } = require('../config/index');
const blogDto = require('../dto/blogDto')
// const myBlogDto = require('../dto/myBlogDto')
const blogDetailDto = require('../dto/blogDetailDto');
const regex = /^data:image\/[^;]+/;

const {getAccessToken, getUserDetailById} = require('../api/getUserDetail')


function getImageType(imageString) {
    const match = regex.exec(imageString);

    if (match) {
        return match[0].split('/')[1];
    } else {
        return null;
    }
}


const createBlog = async (req, res, next) => {
    //  validate request body
    // client -> base64 encoded photo -> decode -> store -> save photopath db
    const createBlogSchema = Joi.object({
        title: Joi.string().required(),
        user: Joi.object().required(),
        content: Joi.string().required(),
        thumbnail: Joi.string().required(),
        readTime: Joi.string().required(),
        tag: Joi.string().required(),
        category: Joi.string().required(),
        subCategory: Joi.string().required(),
        
    });
    const { error } = createBlogSchema.validate(req.body)

    if (error) {
        return next(error)
    }

    const { title, user, content, thumbnail, readTime, tag, category, subCategory } = req.body

    //upload photo
    const buffer = Buffer.from(thumbnail.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64');
    const imagePath = `assets/${Date.now()}-${title.split(' ').join('-')}.png`
    // storing locally
    try {
        fs.writeFileSync(imagePath, buffer)
    } catch (error) {
        return next(error)
    }

    // save to database
    let blog;
    try {
        const newBlog = new Blog({
            title,
            user,
            content,
            thumbnail: `${BASE_URL}/${imagePath}`,
            readTime,
            category, 
            subCategory,
            tag
        });
        blog = await newBlog.save()
    } catch (error) {
        return next(error)
    }
    res.status(201).json({ msg: 'Blog created Successfully', blog })
}

const editBlogById = async (req, res, next) => {
    const createBlogSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        thumbnail: Joi.string().required(),
        readTime: Joi.string().required(),
        tag: Joi.string().required(),
    });
    const { error } = createBlogSchema.validate(req.body)

    if (error) {
        return next(error)
    }
    const blogId = req.params.id
    const { title, content, thumbnail, readTime, tag } = req.body

    let thumbnailUrl = thumbnail
    if (thumbnail.startsWith('data:image/')) {
        const buffer = Buffer.from(thumbnail.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64');
        const imagePath = `assets/${Date.now()}-${title.split().join('-')}.png`
        // Storing locally
        try {
            fs.writeFileSync(imagePath, buffer)
            // console.log('Image uploaded successfully.');
        } catch (error) {
            return next(error)
        }
        thumbnailUrl = `${BASE_URL}/${imagePath}`
    } 



    // update to database
    try {
        await Blog.updateOne({ _id: blogId }, {
            title, thumbnail: thumbnailUrl, content, tag, readTime
        })
    } catch (error) {
        return next(error)
    }
    res.status(201).json({ msg: 'Blog updated Successfully' })
}

const getAllBlogs = async (req, res, next) => {
    try {
        let query = Blog.find({})
        query.sort({ 'updatedAt': -1 });
        let blog = await query.exec()

        // let token = await getAccessToken()

        let blogs = []

        blog.forEach((item)=>{
            blogs.push(new blogDto(item))
        })

        // async function getUserAndApplyDto() {
        //     for (const item of blog){
        //         const user = await getUserDetailById(item.userId,token)
        //         console.log("🚀 ~ file: blogController.js:134 ~ getUserAndApplyDto ~ user:", user)
        //         let newuser = {...user,sub:item.userId}
        //         let newBlog = {...item, user:newuser}
        //         // console.log("🚀 ~ file: blogController.js:135 ~ getUserAndApplyDto ~ newBlog:", newBlog)
        //         let updatedBlog = new blogDto(newBlog)
        //         // console.log("🚀 ~ file: blogController.js:135 ~ getUserAndApplyDto ~ updatedBlog:", updatedBlog)
        //         blogs.push(updatedBlog)
        //     }
        // }
        // await getUserAndApplyDto()
        res.status(200).json({ msg: 'Get all blogs', blogs })
    } catch (error) {
        return next(error)
    }
}
const getBlogById = async (req, res, next) => {
    const blogId = req.params._id
    try {
        let blog = await Blog.findOne({ _id: blogId })
        res.status(200).json({ msg: 'Get blog by Id', blog: new blogDetailDto(blog) })
    } catch (error) {
        return next(error)
    }
}
const getBlogByUser = async (req, res, next) => {
    const userId = req.params.id
    try {
        let query = Blog.find({ 'user.sub': userId })
        query.sort({ 'updatedAt': -1 });
        let blog = await query.exec()

        let blogs = []

        blog.forEach(item => {
            let newblog = new blogDto(item)
            blogs.push(newblog)
        })

        res.status(200).json({ msg: 'Get blogs by user', blogs })
    } catch (error) {
        return next(error)
    }
}
const getBlogByTag = async (req, res, next) => {
    const tag = req.params.tag
    try {
        let query = Blog.find({})
        query.sort({ 'updatedAt': -1 });
        query.where('tag').equals(tag)
        let blog = await query.exec()

        let blogs = []

        blog.forEach(item => {
            let newblog = new blogDto(item)
            blogs.push(newblog)
        })

        res.status(200).json({ msg: 'Get blogs by Tag', blogs })
    } catch (error) {
        return next(error)
    }
}
const deleteBlogById = async (req, res, next) => {
    console.log("blog delete controller")
    const blogId = req.params.id
    // todo delete thumbnail from server
    // todo delete comment of relevent blog
    try {
        await Comment.deleteMany({blogId}) 
        await Blog.deleteOne({ _id: blogId })
        res.status(200).json({ msg: 'Blog Deleted Successfully', })
    } catch (error) {
        return next(error)
    }
}
module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    getBlogByUser,
    getBlogByTag,
    deleteBlogById,
    editBlogById
}