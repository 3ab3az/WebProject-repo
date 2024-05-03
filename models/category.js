const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  Categoryicon: {
    type: String,
  },
  color: {
    type: String,
  },
});
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;