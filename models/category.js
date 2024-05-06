const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
  },
  CategoryIcon: {
    type: String,
  },
  color: {
    type: String,
  },
});
module.exports = mongoose.model("Category", categorySchema);
