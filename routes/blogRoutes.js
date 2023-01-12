const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middleware/check_auth');

const postSchema = Joi.object({
  title: Joi.string().required().min(5).max(30),
  userId: Joi.string().required(),
  detail: Joi.string().required().min(10)
});

router.get('/', check.checkauth, blogController.getAllBlogs);
router.delete('/api/remove/:id', blogController.removeBlog);
router.patch('/api/update/:id', blogController.updateBlog);
router.post('/', validator.body(postSchema), blogController.addBlog);

module.exports = router;

