const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { response } = require("express");

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String,
};
const Post = mongoose.model("post", postSchema);

const homeStartingContent =
  " Welcome to my home blog! to add your blog just add the + /compose . Enjoy creating blogs Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent =
  " about content stuf blalabb bhjhjhLorem ipsum dolor sit amet consectetur, adipisicing elit. Rem sint fugit recusandae harum? Ipsa, nisi accusantium? Sed numquam quis delectus cumque, minima hic. Accusantium nostrum tempore recusandae, doloribus optio illum.";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem sint fugit recusandae harum? Ipsa, nisi accusantium? Sed numquam quis delectus cumque, minima hic. Accusantium nostrum tempore recusandae, doloribus optio illum.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// let posts = [];
app.get("/", function (req, res) {
  Post.find({}, function (err, foundposts) {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      posts: foundposts,
    });
  });
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
app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.posttitle,
    content: req.body.postmessage,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
  
});
app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, foundpost) {
    if (err) {
      console.log(err);
    } else {
      res.render("post", {
        title: foundpost.title,
        content: foundpost.content,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Serevr statred on port 3000");
});
