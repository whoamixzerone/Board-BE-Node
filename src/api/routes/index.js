const express = require('express');

const authRoutes = require('./auth');
const postRoutes = require('./post');
const { isAuthVerify } = require('../middlewares/auth');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/posts', isAuthVerify, postRoutes);

module.exports = router;
