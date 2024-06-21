const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./auth');

// 环境变量配置
require('dotenv').config();

const app = express();

// 中间件
app.use(express.json());
app.use(cors());

// DB 连接
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// 路由
app.get('/', (req, res) => {
  res.send('Welcome to the blog backend!');
});

// 身份验证路由
app.use('/api/user', authRoutes);

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
