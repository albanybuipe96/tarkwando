const Post = require('../models/PostModel')
const Category = require('../models/CategoryModel')

module.exports = {
    index: (req, res) => res.render('admin/index'),

    getPosts: (req, res) => {
        Post.find().populate('category').then(posts => {
            res.render('/admin/posts/index', { posts })
        })

        // res.render('admin/posts/index)
    }
}