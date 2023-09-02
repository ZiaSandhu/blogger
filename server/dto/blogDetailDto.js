class blogDetailDto {
    constructor(blog){
        this._id = blog._id
        this.thumbnail = blog.thumbnail
        this.publishedAt = blog.publishedAt
        this.user = blog.user
        this.title = blog.title
        this.readTime = blog.readTime
        this.content = blog.content
        this.tag = blog.tag
    }
}
module.exports = blogDetailDto
