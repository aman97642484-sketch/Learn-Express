const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.readFile(`./files/${filename}`, "utf8", (err, data) => {
    if (err) {
      res.status(404).send("File not found");
    } else {
      res.render("show", { title: filename, description: data });
    }
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { title: req.params.filename });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("-")}.txt`,
    req.body.description,
    (err) => {
      res.redirect("/");
    },
  );
});

app.post("/edit", (req, res) => {
  fs.rename( `./files/${req.body.previous}` , `./files/${req.body.new}` , function(err) {
    res.redirect("/");
  });
});

app.listen(3000);
