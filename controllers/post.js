const path = require('path');
const fs = require('fs').promises;

exports.addWriteData = async (data) => {
  await fs.writeFile(
    path.join(__dirname, '../simple-data.json'),
    JSON.stringify(data),
    'utf8'
  );
};

exports.getPostList = async (req, res, next) => {
  try {
    res.status(200).json(JSON.parse(req.posts));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.addPostList = async (req, res, next) => {
  try {
    const postList = JSON.parse(req.posts);
    const data = {
      id: postList.length + 1,
      title: req.body.title,
      content: req.body.content,
      registerId: 'xxx',
      hits: 0,
      registerDate: '2022-06-17',
    };
    postList.push(data);

    this.addWriteData(postList);

    res.redirect('/posts');
  } catch (err) {
    console.error(err);
    next(err);
  }
};
