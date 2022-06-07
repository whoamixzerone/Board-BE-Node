const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await fs.readFile('simple-data.json', 'utf8');
    res.status(200).json(JSON.parse(posts));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
