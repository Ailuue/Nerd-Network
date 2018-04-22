const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

const validatePostInput = require('../../validation/post');

//@route GET api/posts/test
//@desc Tests post route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'Post Works!' }));

//@route POST api/posts
//@desc Create post
//@access Private

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Validation
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const fields = ['text', 'name', 'avatar', 'user'];
    const newPost = {};
    fields.forEach(field => {
      newPost[field] = req.body[field];
    });
    new Post(newPost).save().then(post => res.json(post));
  }
);

module.exports = router;
