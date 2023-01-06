const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers')

// router.get('/', blogController.getAllBlogs);
// router.get('/api/:id', blogController.getSingleBlog);
router.post('/', blogController.addBlog);

module.exports = router;

