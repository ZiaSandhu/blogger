const Joi = require('joi')
const fs = require('fs') // built in file system module
const Blog = require('../models/blog');
const { BASE_URL } = require('../config/index');
const blogDto = require('../dto/blogDto')
const blogDetailDto = require('../dto/blogDetailDto');
const { userInfo } = require('os');
const regex = /^data:image\/[^;]+/;




function getImageType(imageString) {
    const match = regex.exec(imageString);

    if (match) {
        return match[0].split('/')[1];
    } else {
        return null;
    }
}


const createBlog = async (req, res, next) => {
    console.log('blog created controller')
    //  validate request body
    // client -> base64 encoded photo -> decode -> store -> save photopath db
    const createBlogSchema = Joi.object({
        title: Joi.string().required(),
        user: Joi.object().required(),
        content: Joi.string().required(),
        thumbnail: Joi.string().required(),
        readTime: Joi.string().required(),
        tag: Joi.string().required(),
    });
    const { error } = createBlogSchema.validate(req.body)

    if (error) {
        return next(error)
    }

    const { title, user, content, thumbnail, readTime, tag } = req.body
    // handle photo 
    const imageType = getImageType(thumbnail)
    const buffer = Buffer.from(thumbnail.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64');
    const imagePath = `assets/${Date.now()}-${user.sub?.split('|')[1]}.${imageType}`
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
    // handle photo 
    const isBase64Image = /^data:image\/(png|jpg|jpeg);base64,/.test(thumbnail);
    let imageUrl = thumbnail
    // todo: if base 64 then delete old one
    if(isBase64Image){
       const imageType = getImageType(thumbnail)
        const buffer = Buffer.from(thumbnail.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'base64');
        imagePath = `assets/${Date.now()}-${user.sub?.split('|')[1]}.${imageType}`
        // storing locally
        try {
            fs.writeFileSync(imagePath, buffer)
        } catch (error) {
            return next(error)
        }
        imageUrl = `${BASE_URL}/${imagePath}`
    }

    // update to database
    try {
        await Blog.updateOne({_id:blogId},{
            title, thumbnail: imageUrl, content, tag,readTime
        })
    } catch (error) {
        return next(error)
    }
    res.status(201).json({ msg: 'Blog updated Successfully' })
}


const getAllBlogs = async (req, res, next) => {
    try {
        let query = Blog.find({})
        query.sort({ 'publishedAt': -1 });
        let blog = await query.exec()

        let blogs = []

        blog.forEach(item => {
            let newblog = new blogDto(item)
            blogs.push(newblog)
        })  

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
        let query = Blog.find({'user.sub':userId})
        query.sort({ 'publishedAt': -1 });
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
const deleteBlogById = async (req, res, next) => {
    console.log("blog delete controller")
    const blogId = req.params.id
    // todo delete thumbnail from server
    try {
        await Blog.deleteOne({_id: blogId})
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
    deleteBlogById,
    editBlogById
}