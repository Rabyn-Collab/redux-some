const mongoose = require('mongoose');



const blogSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  }

});

const Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog;