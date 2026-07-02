require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');     

router.post("/login",async (req,res)=>{
      try{
      const {username,password}=req.body;
      const user=await User.findOne({username:username});

      if(!user){
          return res.status(404).json({
            success: false,
            message: "User not found"
          });
      }
      const isMatch=await bcrypt.compare(password,user.password);

      if(!isMatch){
          return res.status(401).json({
            success: false,
            message: "Invalid credentials"
          });
      }   

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",   
        secure: false      
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
            user: {
            _id: user._id,
           username: user.username
          }

       });
      }catch(err){
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Server error"
          });
      }
  });
  
router.post("/signup",async (req,res)=>{
  
        try{
        const {username,password}=req.body;
  
        if (!username || !password) {
            
            return res.status(400).json({
              success: false,
              message: "Missing fields"
            });
        }
  
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
              success: false,
              message: "User already exists"
            });
        }
  
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser=new User({
            username:username,
            password:hashedPassword,
         })
  
        await newUser.save();
  
        const token = jwt.sign(
          { userId: newUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
  
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",   
          secure: false      
        });
  
        return res.status(200).json({
          success: true,
          message: "Signup successful",
              user: {
             _id: newUser._id,
            username: newUser.username
           }
         });
  
        }catch(err){
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Server error"
            });
        }
    });

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  });

router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

module.exports = router;