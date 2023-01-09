const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const postSchema = Joi.object({
  // email: Joi.string().email({ tlds: { allow: false } }).required(),
  title: Joi.string().required().min(5).max(30),
  detail: Joi.string().required().min(10)
});

router.get('/', blogController.getAllBlogs);
router.delete('/api/remove/:id', blogController.removeBlog);

// router.get('/api/:id', blogController.getSingleBlog);
router.post('/', validator.body(postSchema), blogController.addBlog);

module.exports = router;

