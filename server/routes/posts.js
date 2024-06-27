// server/routes/posts.js
const express = require('express');
const router = express.Router();

// 模拟的博客帖子数据
let posts = [
  { id: 1, title: '首个', content: '无敌了.' },
  { id: 2, title: 'Second Post', content: 'This is the second post.' }
];

// 获取所有博客帖子
router.get('/', (req, res) => {
  res.json(posts);
});

// 获取单个博客帖子
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// 创建新的博客帖子
router.post('/', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// 更新博客帖子
router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// 删除博客帖子
router.delete('/:id', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).end();
});

module.exports = router;
