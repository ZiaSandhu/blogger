class CategoryDto{
    constructor(category){
        this.name= category.name
        this.subCategories = category.subCategories
    }
}

module.exports = CategoryDto