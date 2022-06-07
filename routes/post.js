const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const router = express.Router();

router.use(async (req, res, next) => {
  try {
    const posts = await fs.readFile(
      path.join(__dirname, '../simple-data.json'),
      'utf8'
    );
    req.posts = posts;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const postList = JSON.parse(req.posts);
    const data = {
      id: postList.length + 1,
      title: req.body.title,
      content: req.body.content,
      registerId: 'xxx',
      hits: 0,
      registerDate: '2022-06-06',
    };
    postList.push(data);

    await fs.writeFile(
      path.join(__dirname, '../simple-data.json'),
      JSON.stringify(postList),
      'utf8'
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
