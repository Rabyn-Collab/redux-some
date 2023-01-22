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

const paramsSchema = Joi.object({
  id: Joi.string().required(),
});

const methodNotAllowed = (req, res) => res.status(405).json({ message: 'method not allowed' });


router.route('/').get(blogController.getAllBlogs).all(methodNotAllowed);
router.route('/api/getBlog/:id').get(blogController.getBlogById).all(methodNotAllowed);
router.route('/api/getUserPost').get(check.checkauth, blogController.getAllBlogs).all(methodNotAllowed);
router.route('/api/remove/:id').delete(check.checkauth, blogController.removeBlog).all(methodNotAllowed);
router.route('/api/update/:id').patch(check.checkauth, validator.params(paramsSchema), blogController.updateBlog).all(methodNotAllowed);
router.route('/api/addBlog').post(check.checkauth, validator.body(postSchema), blogController.addBlog).all(methodNotAllowed);


module.exports = router;

