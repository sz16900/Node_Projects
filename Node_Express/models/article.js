let mongoose = require('mongoose');

// Lets create a Schema
let articleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  }
});

// Pass the name model and the Schema
let Article = module.exports = mongoose.model('Article', articleSchema);
