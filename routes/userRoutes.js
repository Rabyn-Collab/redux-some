const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().required().min(5).max(30),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required().min(5).max(30),
});


const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required().min(5).max(30),
});


router.post('/api/userLogin', validator.body(loginSchema), userController.userLogin);
router.post('/api/userSignUp', validator.body(registerSchema), userController.userSignUp);

module.exports = router;

