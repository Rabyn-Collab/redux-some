const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')



module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      const isValidPassword = await bcrypt.compareSync(password, existUser.password);
      if (isValidPassword) {
        const token = jwt.sign({ _id: existUser._id }, 'tokenGenerate');
        return res.status(201).json({
          username: existUser.username,
          email,
          token,
          id: newUser._id
        });
      } else {
        res.status(422).json({ message: 'invalid credentail' });
      }
    } else {
      res.status(401).json({ message: 'check your credentail' });
    }

  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}



module.exports.userSignUp = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User already exist' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      username,
      password: hashedPassword
    });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, 'tokenGenerate');
    return res.status(201).json({
      username,
      email,
      token,
      id: newUser._id
    });
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}