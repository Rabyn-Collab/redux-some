const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middleware/check_auth');

const postSchema = Joi.object({
  title: Joi.string().required().min(5).max(30),
  detail: Joi.string().required().min(10)
});

const methodNotAllowed = (req, res) => res.status(405).json({ message: 'method not allowed' });

// router.get('/',);
router.route('/').get(blogController.getAllBlogs).all(methodNotAllowed);

router.get('/api/getUserPost', check.checkauth, blogController.getUserBlogs);
router.delete('/api/remove/:id', check.checkauth, blogController.removeBlog);
router.patch('/api/update/:id', check.checkauth, blogController.updateBlog);
router.post('/api/addBlog', check.checkauth, validator.body(postSchema), blogController.addBlog);

module.exports = router;

