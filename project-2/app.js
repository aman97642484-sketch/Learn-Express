const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find({});
  res.render("read", { users });
});

app.get("/edit/:id", async (req, res) => {
  let { id } = req.params;
  let user = await userModel.findOne({ _id: id });
  res.render("edit", { user });
});

app.get("/delete/:id", async (req, res) => {
  let { id } = req.params;
  await userModel.findByIdAndDelete(id);
  res.redirect("/read");
});

app.post("/create", async (req, res) => {
  let { name, email, imgUrl } = req.body;
  let createdUser = await userModel.create({
    name,
    email,
    imgUrl,
  });
  res.redirect("/read");
});

app.post("/update/:id", async (req, res) => {
  let { id } = req.params;
  let { name, email, imgUrl } = req.body;
  await userModel.findByIdAndUpdate(id, { name, email, imgUrl });
  res.redirect("/read");
});

app.listen(3000);
