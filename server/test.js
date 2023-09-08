const { URI } = require('./config/index')
const dbConnect = require('./database/index')
const Category = require('./models/category')
const Blog = require('./models/blog')
const Comment = require('./models/comment')

const categoriesData = [
  {
    name: "Technology",
    subCategories: ["Gadgets", "Software", "Hardware", "Internet", "Mobile"],
  },
  {
    name: "Travel",
    subCategories: ["Destinations", "Travel Tips", "Adventure", "Cultural"],
  },
  {
    name: "Food",
    subCategories: ["Recipes", "Restaurant Reviews", "Cooking Tips", "Healthy Eating"],
  },
  {
    name: "Health",
    subCategories: ["Fitness", "Mental Health", "Diet", "Wellness"],
  },
  {
    name: "Fashion",
    subCategories: ["Clothing", "Accessories", "Trends", "Beauty"],
  },
  {
    name: "Lifestyle",
    subCategories: ["Home Decor", "Relationships", "Parenting", "Self Improvement"],
  },
];

async function db() {

  try {
    await dbConnect(URI)
    // await Category.deleteMany({})
    // await Category.insertMany(categoriesData)
    // await Blog.deleteMany({})
    await Comment.deleteMany({})
    console.log("Success")

  } catch (error) {
    console.log(error)
  }
}
db()