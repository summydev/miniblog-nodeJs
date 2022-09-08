const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose= require("mongoose");

mo

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

let posts = [];
app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts,
  });
  console.log(posts);
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
  const post = {
    title: req.body.posttitle,
    message: req.body.postmessage,
  };
  posts.push(post);
  res.redirect("/");
  // let input = req.body.posttitle;
  // let m = req.body.postmessage;
});
app.get("/posts/:postName", function (req, res) {
  const requestTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestTitle) {
      console.log("matching");
      res.render("post", {
        title: post.title,
        message: post.message,
      });
    } else {
      console.log("Oops! Error 404 :crying");
    }
  });
  // console.log(req.params.postName);
});

app.listen(3000, function () {
  console.log("Serevr statred on port 3000");
});
