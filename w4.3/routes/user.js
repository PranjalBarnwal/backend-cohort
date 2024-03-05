const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const createdUser = User.create({
    username,
    password,
  });
  if (createdUser) res.json({ msg: "User created successfully" });
  else res.json({ msg: "error in creating user" });
});

router.get("/courses", async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    const courseId=req.params.courseId;
    const username=req.headers.username;
    await User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses:courseId
        }
    });
    res.json({
        msg:"Course purchased"
    })
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
   const user = await User.findOne({
        username:req.headers.username
    })
   const courses=await Course.find({
    _id:{
        "$in":user.purchasedCourses
    }
   }) 
   res.json({
    courses:courses
   })
});

module.exports = router;
