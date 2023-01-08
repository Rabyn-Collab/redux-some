const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const blogVal = Joi.object({
  title: Joi.string().required().min(3),
  detail: Joi.string().required().max(10)
});

// router.get('/', blogController.getAllBlogs);
// router.get('/api/:id', blogController.getSingleBlog);
router.post('/', validator.body(blogVal), blogController.addBlog);

module.exports = router;

