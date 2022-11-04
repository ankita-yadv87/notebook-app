const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { findOne } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "ankitaisagoodgirl"

//Route: 1 create a user  using : Post "/api/auth/createuser". no login required
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be a of atleast 5 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //if errors , return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //check whether  the  user with this email already exists
    try {
      let success = false;
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id
        }
      };

      //  const jwtData = jwt.sign(data, JWT_SECRET);
      const authtoken = jwt.sign(data, JWT_SECRET);
      //  console.log(jwtData);
      success = true;
      //res.json(authtoken);
      res.send({ success, authtoken });


      // res.json(user);
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }

    // .then((user) => res.json(user))
    // .catch(err=> {console.log(err)
    //  res.json({error: 'please enter a unique value for email', message: err.message})});

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
  }
);

//Route: 2 Authenticating  a user  using : Post "/api/auth/login". no login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists()
  ],
  async (req, res) => {
    //if errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //taking out email pwd using destructuring
    try {
      let user = await User.findOne({ email }) //pulling user from database whose email is same as user
      if (!user) {
        return res.status(400).json({ error: "please enter valid credentials" });
      }
      //email is correct then we will check if password is correct or not
      const passwordCompare = await bcrypt.compare(password, user.password); //internally comapre pwd and return true/false
      let success = false;
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "please enter valid credentials" });
      }

      //if password matches then we'll send user data
      const data = {
        user: {
          id: user.id
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authtoken });


    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");

    }
  }
);

//Route: 3 Get loggedin user details using : Post "/api/auth/getuser". login required

router.post(
  "/getuser", fetchuser, async (req, res) => {
    try {

      let userId = req.user.id;
      //we'll ger user id from auth token and then select all data except pwd
      const user = await User.findById(userId).select("-password"); //we'll ger user id from auth token
      res.send(user);
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

module.exports = router;
