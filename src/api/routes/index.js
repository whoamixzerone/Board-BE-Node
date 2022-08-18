const express = require('express');

const authRoutes = require('./auth');
const postRoutes = require('./post');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

module.exports = router;
