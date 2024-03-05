const { Admin, Course, User } = require("../db/index");
const { Router } = require("express");
const {JWT_SECRET} = require("../config");
const jwt=require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();

router.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Admin.create({
    username: username,
    password: password,
  })
    .then(function () {
      res.status(200).json({
        message: "Admin created successfully",
      });
    })
    .catch(function () {
      res.status(404).json({
        message: "User Not created",
      });
    });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
 
  const user = await User.find({
    username,
    password,
  });
  if (!user)
    res.status(411).json({
      msg: "Incorrect email and password",
    });
  const token = jwt.sign(
    {
      username,
    },
    JWT_SECRET
  );
  res.json({
    token
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  const newCourse = await Course.create({
    title: title,
    description: description,
    imageLink: imageLink,
    price: price,
  });
  console.log("this is the course details" + newCourse);
  res.json({
    message: "course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses,
  });
});

module.exports = router;
