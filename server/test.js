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
const users = [
  {
    "name": "Zia Jutt",
    "picture": "https://lh3.googleusercontent.com/a/AAcHTtcTkVhaxeP9uampi8kKncNdU8p-gUeFd-Hc4tZKIlsQFo4=s96-c",
    "sub": "google-oauth2|111493673908422285448"
  },
  {
    "name": "admiable15@gmail.com",
    "picture": "https://s.gravatar.com/avatar/201700a1bab7e78044f37cceaa1bccb8?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fad.png",
    "sub": "auth0|64f063f1d9a2db31b1e12b2d"
  },
  {
    "name": "umerfarooqamjad2000@gmail.com",
    "picture": "https://s.gravatar.com/avatar/df1a3080888666de37014b56b660d032?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fum.png",
    "sub": "auth0|64f71cc29b74b1ea52a240d4"
  },
  {
    "name": "YASER DAANIAL KHAN",
    "picture": "https://lh3.googleusercontent.com/a/AAcHTtfk625CLlJRPYWVFAv-UpPFK-E13Gyq9Z0UHbFnFyoV=s96-c",
    "sub": "google-oauth2|108009479887425022108"
  },
  {
    "name": "kosain haider",
    "picture": "https://lh3.googleusercontent.com/a/AAcHTtdWtV19VICPC4V6OJCRQFZI0HIn4rqppBtuNDCPM5qd=s96-c",
    "sub": "google-oauth2|108527825659190786763"
  },
  {
    "name": "Zia Ur Rehman",
    "picture": "https://lh3.googleusercontent.com/a/AAcHTtcbhaUy6sih3h4N8PoGH7VV1HhI5oZD2bNaSPp0WilQ=s96-c",
    "sub": "google-oauth2|103509090145561389211"
  }
]
const moreBlogs = [
  {
    title: "The Future of Mobile Technology",
    tag: "Tech",
    readTime: 8,
    category: "Technology",
    subCategory: "Mobile",
    content: "Explore the exciting developments in mobile technology and what the future holds for smartphones.",
    thumbnailURL: "https://example.com/mobile-tech-thumbnail.jpg",
  },
  {
    title: "Cultural Exploration",
    tag: "Travel",
    readTime: 6,
    category: "Travel",
    subCategory: "Cultural",
    content: "Immerse yourself in the rich cultures and traditions of different countries around the world.",
    thumbnailURL: "https://example.com/cultural-travel-thumbnail.jpg",
  },
  {
    title: "Mastering the Art of Cooking",
    tag: "Food",
    readTime: 7,
    category: "Food",
    subCategory: "Cooking Tips",
    content: "Learn cooking techniques from the pros and elevate your culinary skills in the kitchen.",
    thumbnailURL: "https://example.com/cooking-tips-thumbnail.jpg",
  },
  {
    title: "Achieving Wellness in Everyday Life",
    tag: "Health",
    readTime: 5,
    category: "Health",
    subCategory: "Wellness",
    content: "Discover holistic approaches to wellness and maintain a healthy lifestyle with ease.",
    thumbnailURL: "https://example.com/wellness-thumbnail.jpg",
  },
  {
    title: "Beauty Trends and Tips",
    tag: "Fashion",
    readTime: 6,
    category: "Fashion",
    subCategory: "Beauty",
    content: "Stay up-to-date with the latest beauty trends, makeup tips, and skincare routines.",
    thumbnailURL: "https://example.com/beauty-trends-thumbnail.jpg",
  },
  {
    title: "Creating a Cozy Home",
    tag: "Lifestyle",
    readTime: 5,
    category: "Lifestyle",
    subCategory: "Home Decor",
    content: "Transform your living space into a cozy and inviting home with these decor ideas.",
    thumbnailURL: "https://example.com/cozy-home-thumbnail.jpg",
  },
  {
    title: "Innovations in Hardware Technology",
    tag: "Tech",
    readTime: 7,
    category: "Technology",
    subCategory: "Hardware",
    content: "Stay informed about the latest advancements in hardware technology and computer components.",
    thumbnailURL: "https://example.com/hardware-tech-thumbnail.jpg",
  },
  {
    title: "Parenting Tips and Advice",
    tag: "Lifestyle",
    readTime: 6,
    category: "Lifestyle",
    subCategory: "Parenting",
    content: "Navigating the joys and challenges of parenthood with expert parenting tips and advice.",
    thumbnailURL: "https://example.com/parenting-tips-thumbnail.jpg",
  },
  {
    title: "Exploring Internet Trends",
    tag: "Tech",
    readTime: 5,
    category: "Technology",
    subCategory: "Internet",
    content: "Dive into the latest internet trends and innovations shaping the digital landscape.",
    thumbnailURL: "https://example.com/internet-trends-thumbnail.jpg",
  },
  {
    title: "Adventure Stories",
    tag: "Travel",
    readTime: 8,
    category: "Travel",
    subCategory: "Adventure",
    content: "Embark on thrilling journeys through adventure stories that will inspire your next trip.",
    thumbnailURL: "https://example.com/adventure-stories-thumbnail.jpg",
  },
  {
    title: "Delightful Recipes to Try",
    tag: "Food",
    readTime: 7,
    category: "Food",
    subCategory: "Recipes",
    content: "Explore a collection of delightful recipes from around the world and satisfy your taste buds.",
    thumbnailURL: "https://example.com/recipes-thumbnail.jpg",
  },
  {
    title: "Achieving Mental Clarity",
    tag: "Health",
    readTime: 6,
    category: "Health",
    subCategory: "Mental Health",
    content: "Learn mindfulness techniques and strategies for achieving mental clarity and well-being.",
    thumbnailURL: "https://example.com/mental-clarity-thumbnail.jpg",
  },
  {
    title: "Fashion Forward: Clothing Trends",
    tag: "Fashion",
    readTime: 5,
    category: "Fashion",
    subCategory: "Clothing",
    content: "Stay stylish with the latest clothing trends and wardrobe essentials for every season.",
    thumbnailURL: "https://example.com/clothing-trends-thumbnail.jpg",
  },
  {
    title: "Accessorizing with Flair",
    tag: "Fashion",
    readTime: 4,
    category: "Fashion",
    subCategory: "Accessories",
    content: "Elevate your fashion game with tips on accessorizing and choosing the perfect accessories.",
    thumbnailURL: "https://example.com/accessorizing-thumbnail.jpg",
  },
  {
    title: "Self-Improvement Journey",
    tag: "Lifestyle",
    readTime: 6,
    category: "Lifestyle",
    subCategory: "Self Improvement",
    content: "Embark on a self-improvement journey with actionable advice and personal development tips.",
    thumbnailURL: "https://example.com/self-improvement-thumbnail.jpg",
  },
  {
    title: "Sustainable Living Tips",
    tag: "Lifestyle",
    readTime: 5,
    category: "Lifestyle",
    subCategory: "Self Improvement",
    content: "Discover sustainable living practices and make eco-friendly choices for a better planet.",
    thumbnailURL: "https://example.com/sustainable-living-thumbnail.jpg",
  },
  {
    title: "Top Software Picks",
    tag: "Tech",
    readTime: 7,
    category: "Technology",
    subCategory: "Software",
    content: "Find the best software applications for various tasks and boost your productivity.",
    thumbnailURL: "https://example.com/software-picks-thumbnail.jpg",
  },
  {
    title: "Tasty Dishes from Around the World",
    tag: "Food",
    readTime: 6,
    category: "Food",
    subCategory: "Recipes",
    content: "Explore international cuisines and savor delicious dishes from different cultures.",
    thumbnailURL: "https://example.com/world-cuisine-thumbnail.jpg",
  },
  {
    title: "Dietary Choices for Health",
    tag: "Health",
    readTime: 5,
    category: "Health",
    subCategory: "Diet",
    content: "Make informed dietary choices to improve your health and well-being.",
    thumbnailURL: "https://example.com/dietary-choices-thumbnail.jpg",
  },
  {
    title: "Relationships and Communication",
    tag: "Lifestyle",
    readTime: 6,
    category: "Lifestyle",
    subCategory: "Relationships",
    content: "Enhance your relationships through effective communication and understanding.",
    thumbnailURL: "https://example.com/relationships-thumbnail.jpg",
  },
];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
let blogs = []
 moreBlogs.forEach((item)=> {
  item.user = users[getRandomInt(0,5)]
  item.thumbnail = item.thumbnailURL
  delete item.thumbnailURL
  blogs.push(item)
})

async function db() {

  try {
    await dbConnect(URI)
    // await Category.deleteMany({})
    // await Category.insertMany(categoriesData)
    await Blog.deleteMany({})
    // await Comment.deleteMany({})

    await Blog.insertMany(blogs)

    console.log("Success")

  } catch (error) {
    console.log(error)
  }
}
db()