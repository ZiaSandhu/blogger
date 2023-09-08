class blogDto {
    constructor(blog){
        this._id = blog._id
        this.thumbnail = blog.thumbnail
        this.createdAt = blog.createdAt
        this.updatedAt = blog.updatedAt
        this.user = blog.user
        this.title = blog.title
        this.readTime = blog.readTime
        this.tag = blog.tag
        this.category = blog.category
        this.subCategory = blog.subCategory
        // this.content = blog.content
    }
}
module.exports = blogDto