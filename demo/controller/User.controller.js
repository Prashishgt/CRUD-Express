const User = require('../models/Users.model');

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users, sucess: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name, email, age, password, cpassword,
    } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    // if(validateEmail(email)){
    //     return res.status(400).json({error:"Valid Email is required"})
    // }
    if (!age) {
      return res.status(400).json({ error: 'Age is required' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    if (password !== cpassword) {
      return res.status(400).json({ error: 'Password do not match' });
    }

    const user = await User.create({
      name, email, age, password,
    });

    if (!user) {
      return res.status(500).json({ message: 'Failed to create user', success: false });
    }

    return res.status(200).json({ message: 'User successfully created', success: true });
  } catch (error) {
    console.log('Error in user controller', error);
    return res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id: userId } = req.params;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }
    return res.status(200).json({ user, sucess: true });
  } catch (error) {
    console.log('Error in getUser', error);
    return res.status(500).json({ error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ error: 'Email or Password is missing' });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // console.log('Password is', user.password);
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.log('Error in loginUser', error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUser,
  loginUser,
};
