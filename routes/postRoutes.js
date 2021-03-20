const express = require('express');
const router = express.Router();
const post = require('../controllers/controllerPost')

router.route('/')
.get(post.viewPosts)
.post(post.createNewPost)

router.get('/new', post.renderNewPost)

router.route('/:id')
.get(post.showPage)
.put(post.editPost)
.delete(post.remove)

router.get('/:id/edit', post.renderEdit)

module.exports = router;
