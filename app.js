//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const moongose = require("mongoose");
moongose.connect("mongodb+srv://Shivam:Test-123@cluster0.a3pk5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser : true, useUnifiedTopology: true});



const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 

const postschema ={
  title : String,
  content: String
}

const postitem = moongose.model("postitem" , postschema);

const postitem1 = new postitem({
     title : "Hari",
     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores laborum, tenetur in qui molestiae earum"
})

const postitem2 = new postitem({
  title : "Sagar",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores laborum, tenetur in qui molestiae earum"
})

const postitem3 = new postitem({
  title : "Shivam",
  content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores laborum, tenetur in qui molestiae earum"
})

const posts = [postitem1, postitem2,postitem3];
const postarr = [postitem1, postitem2,postitem3];



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.get("/",function(req,res){

  postitem.find({}, function(err, founditems){
    if(founditems == 0){
      postitem.insertMany(posts, function(err){
        if(err){
          console.log(err)
        }
        else{
            console.log("sucussfully save default to database")
          }
        }
      )
      console.log("No Posts")
      res.redirect("/");
    }
    else{
    res.render("home" , {
      StartingContent : homeStartingContent, 
      posts : founditems
    });
  }
  })
  
})

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent})
})

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent})
})

app.get("/compose", function(req, res){
  res.render("compose")
})
app.get("/posts/:Postname", function(req, res){
  const requestedtitle = _.lowerCase(req.params.Postname);
   posts.forEach(function(post){
     const storedtitle = _.lowerCase(post.title)
     if(storedtitle == requestedtitle){
       console.log("matched Found")
       res.render("post" , {
        Posttitle : storedtitle,
        postContent : post.content
      });
     }
   })
})

app.post("/compose", function(req, res){
  const post= new postitem({
    title : req.body.posttitile,
    content : req.body.postbody
  })
  console.log(post)
  postitem.insertMany(post, function(err){
    if(err){
      console.log(err)
    }
    else{
        console.log("sucussfully save default to database")
      }
    }
  )
  // postitem.insertOne(post)
  res.redirect("/");
})

 
app.listen(process.env.PORT ||3000, function() {
  console.log("Server started on port 3000");
});