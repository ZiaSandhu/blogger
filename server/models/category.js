const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  subCategories: [String],
});

module.exports = mongoose.model("Category", categorySchema);

