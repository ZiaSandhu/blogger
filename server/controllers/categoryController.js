const Category = require('../models/category')
const CategoryDto = require('../dto/categoryDto')
const getAllCategories = async(req, res, next) => {
    try {
        let response = await Category.find({})
        let categories = []
        response.forEach(item => {
            let category = new CategoryDto(item)
            categories.push(category)
        })
        res.status(200).json({msg:"Get all categories", categories})
    } catch (error) {
        return next(error)
    }

}

module.exports = {
    getAllCategories
}