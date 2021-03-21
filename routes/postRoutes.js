const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const post = require('../controllers/controllerPost')

router.route('/')
.get(catchAsync(post.viewPosts))
.post(catchAsync(post.createNewPost))

router.get('/new', post.renderNewPost)

router.route('/:id')
.get(catchAsync(post.showPage))
.put(catchAsync(post.editPost))
.delete(catchAsync(post.remove))

router.get('/:id/edit', catchAsync(post.renderEdit))

module.exports = router;
