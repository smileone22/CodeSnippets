const express = require("express");
const app = express();
const mongoose = require('mongoose');
const CodeSnippet = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));



app.post('/code_snippets/', (req, res) => {
    console.log("thisis", req.body);
    CodeSnippet.create({
        title: req.body.title,
        code: req.body.code,
        comments: []
        });
});

app.post('/code_snippets/:id/comments/', (req, res) => {
   console.log(req.params);
   console.log(req.body["comment"]);
    CodeSnippet.findByIdAndUpdate(req.params["id"], {
          "$push": {
             comments: req.body["comment"]
          }
       }, {
          "new": true
       },
       (err, docs) => {
          if (err) {
             res.json({
                "error": "The comment was not successfully added."
             });
          } else {
             res.json({
                "message": "Change was successful",
                "docs": docs
             });
          }
       }
    );
 
 });
 
//you can use res.json or res.send with a JavaScript object and express will stringify the object and set the appropriate headers). You can use find() function of mongoose to retreive all documents of the collection.
app.get('/code_snippets/', (req, res) => {
    console.log(CodeSnippet);
    CodeSnippet.find({}).exec((err,result,count)=>{
        console.log(result);
        res.json(result);
    });
    
});





const port = 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
