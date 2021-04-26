const mongoose = require('mongoose');

const CodeSnippetSchema = mongoose.Schema({
  title: String,
  code: String,
  comments: [String]
});

mongoose.connect('mongodb://localhost/hw08', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


// db.codesnippets.insert({
//   "title" : "foreach",
//   "code" : "arr.forEach(callback(currentValue[, index[, array]]) {   }[, thisArg]);", 
//   "comments" : ["Simple! Love it!"]
//  });

//  db.codesnippets.insert({
//   "title" : "Binary Search(recursive)",
//   "code" : "", 
//   "comments" : ["Awesome. Thanks.", "This code beats all the solutions I had in my mind!"]
//  });

//array1.forEach(element => console.log(element));

// db.codesnippets.insert({
//     "title" : "XOR Swap Values",
//     "code" : "a = a ^ b; b = b ^ a; a = a ^ b;", 
//     "comments" : ["Awesome. Thanks.", "This code beats all the solutions I had in my mind!"]
//    });
module.exports = mongoose.model("CodeSnippet", CodeSnippetSchema);