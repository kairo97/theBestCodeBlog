const express = require('express');
const router = express.Router();

const userRoutes = require('./userController')
router.use('/api/users', userRoutes);

const postRoutes = require('./postController')
router.use('/api/posts', postRoutes);

module.exports = router;