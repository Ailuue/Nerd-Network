const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

//@route GET api/posts/test
//@desc Tests post route
//@access Public
router.get('/test', (req, res) => res.json({ msg: 'Post Works!' }));

//@route GET api/posts/
//@desc Get all posts
//@access Public

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: 'No posts found' }));
});

//@route GET api/posts/:id
//@desc Get post by id
//@access Public

router.get('/:id', (req, res) => {
  Post.findBy(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopost: 'No post found with that id' })
    );
});

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

//@route DELETE api/posts/:id
//@desc Delete post
//@access Public

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: 'User not authorized' });
            }

            //Delete
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch(err => res.status(400).json(error));
          })
          .catch(err => res.status(400).json(error));
      })
      .catch(err => res.status(400).json(error));
  }
);

module.exports = router;
