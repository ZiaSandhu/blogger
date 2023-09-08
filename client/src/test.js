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
  ]

  let find = categoriesData.find((category)=> category.name === 'Lifestyle').subCategories
  console.log(find)