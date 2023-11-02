//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const moongose = require("mongoose");
const dotenv = require("dotenv");
const { readAllPosts, insertMany, getPostById, createOrUpdate } = require("./db/User");
const crypto = require("crypto");

dotenv.config();
moongose.connect(process.env.MongoKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const postschema = {
  title: String,
  content: String,
};

const postitem = moongose.model("postitem", postschema);

const postitem1 = {
  POST_TITLE: "Deva",
  POST_CONTENT: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores laborum, tenetur in qui molestiae earum"
};

const postitem2 = {
  POST_TITLE: "Atharva",
  POST_CONTENT: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit asperiores laborum, tenetur in qui molestiae earum"
};

const posts = [postitem1, postitem2];
const postarr = [postitem1, postitem2];

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", async function (req, res) {
  const allPosts = await readAllPosts();
  if (allPosts.data == null || allPosts.data.length === 0) {
    posts.map(async(value,index) => {
      const status = await createOrUpdate(value)
    })
    res.redirect("/");
  } else {
    res.render("home", {
      StartingContent: homeStartingContent,
      posts: allPosts.data,
    });
  }
  // postitem.find({}, function(err, founditems){
  //   if(founditems == 0){
  //     postitem.insertMany(posts, function(err){
  //       if(err){
  //         console.log(err)
  //       }
  //       else{
  //         }
  //       }
  //     )
  //     console.log("No Posts")
  //   }
  //   else{
  //   res.render("home" , {
  //     StartingContent : homeStartingContent,
  //     posts : founditems
  //   });
  // }
  // })
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});
app.get("/posts/:Postname", async function (req, res) {
  const requestedtitle = req.params.Postname;
  const post = await getPostById(requestedtitle,'POST_ID');
  res.render("post", {
    Posttitle: post.data['POST_TITLE'],
    postContent: post.data['POST_CONTENT'],
  });
  // postitem.find({}, function (err, posts) {
  //   posts.forEach(function (post) {
  //     const storedtitle = _.lowerCase(post.title);
  //     if (storedtitle == requestedtitle) {
  //       console.log("matched Found");
  //     }
  //   });
  // });
  //  posts.forEach(function(post){
  //    const storedtitle = _.lowerCase(post.title)
  //    if(storedtitle == requestedtitle){
  //      console.log("matched Found")
  //      res.render("post" , {
  //       Posttitle : storedtitle,
  //       postContent : post.content
  //     });
  //    }
  //  })
});

app.post("/compose", async function (req, res) {
  const post = {
    POST_TITLE: req.body.posttitile,
    POST_CONTENT: req.body.postbody
  }

  const insert = await createOrUpdate(post)
  if(insert.success === true){
    res.redirect("/");
  }
  else{
    console.log("Error");
  }
  // postitem.insertOne(post)
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server Has Started");
});
