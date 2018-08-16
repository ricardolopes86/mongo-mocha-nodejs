const mongoose = require('mongoose');
const User = require('../src/users.model');
const Comment = require('../src/comments.schema');
const BlogPost = require('../src/blogpost.schema');
const assert = require('assert');

describe('Associations', () => {
    let joe, blogpost, comment;

    beforeEach(() => {
        joe = new User({ name: 'Joe' });
        blogpost = new BlogPost({
            title: 'JS is great',
            content: 'Yeap, it is really awesome'
        });
        comment = new Comment({ content: 'Congrats for the great post' });

        joe.blogPost.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogpost.save(), comment.save()]);
    });

    it('saves a relation between user and blogpost', () => {
        User.findOne({ name: 'Joe' })
            .then((user) => {
                console.log(user);
            });
    });

    it('saves a full rellation graph', () => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPost[0].title === 'JS is Great');
                assert(user.blogPost[0].comments[0].content === 'Yeap, it is really awesome');
                assert(user.blogPost[0].comments[0].user.name === 'Joe');
            });
    });
});