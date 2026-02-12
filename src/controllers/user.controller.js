const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');

const list = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

const create = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email and password are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  // Note: Add proper password hashing before production use.
  const user = await User.create({ name, email, password });
  res.status(201).json({ id: user.id, name: user.name, email: user.email });
});

module.exports = { list, create };
