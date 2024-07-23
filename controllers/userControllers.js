const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password, pic } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("Please enter all the Fields");
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      pic,
    });

    //token --> when new user is created token is required

    if (user) {
      res.status(201).json({
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        },
        success: true,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create the User");
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const pwsd = await user.matchPassword(password);
    console.log(14, pwsd);

    if (user && (await user.matchPassword(password))) {
      res.json({
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        },
        success: true,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

//api creation for all users-->  /api/user?search=indhu
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        //The $or operator performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of the <expressions>.
        //$regex-->https://www.mongodb.com/docs/manual/reference/operator/query/regex/

        //$or-->https://www.mongodb.com/docs/manual/reference/operator/query/or/

        $or: [
          //$regex --> Provides regular expression capabilities for pattern matching strings in queries.
          { firstName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  // console.log(keyword);

  //$ne selects the documents where the value of the specified field is not equal to the specified value.
  //This includes documents that do not contain the specified field.
  //https://www.mongodb.com/docs/manual/reference/operator/query/ne/
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
