const User = require("../models/User")
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = "abhishek"
require("dotenv").config()

const generateToken = (id) => {
    return jwt.sign({ id },JWT_SECRET_KEY, { expiresIn: "9h" })
};


exports.RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.json({
                message: "User Already Exists"
            })
        }

        const user = await User.create({ name, email, password })
          console.log(user)

          if (user) {
            return res.status(201).json({
                _id: user._id,
                email: user.email,
                name: user.name,
                token: generateToken(user._id)
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "User Register Successfully",user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "user register successfully",error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (!(await user.matchPassword(password))) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        // Send a single response
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            success: true,
            message: "Login Successfully"
        });

    } catch (error) {
        console.log(error);
        // Ensure no further response is sent if an error occurs
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error", error
            });
        }
    }
};


exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};
