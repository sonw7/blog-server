const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // 假设你有一个 User 模型

const router = express.Router();

// 注册新用户
router.post('/register', async (req, res) => {
  try {
    // 加密密码
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 创建新用户
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // 保存到数据库
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    // 通过用户名查找用户
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('User not found.');

    // 比较密码
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send('Invalid password.');

    // 创建并分配 token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.header('auth-token', token).send(token);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
