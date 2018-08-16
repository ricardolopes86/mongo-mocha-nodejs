const assert = require('assert');
const User = require('../src/users.model');

describe('Subdocuments', () => {
    it('create some subdocuments', () => {
        const joe = new User ({
            name: 'Joe',
            posts: [{title: 'Post Title'}]
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                console.log(user);
                
                assert(user.posts.title === 'Post Title');
            });
        console.log(joe);
        
    });

    it('add a subdocument to an existing user', () => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                user.posts.push({title: 'New Post'});
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');

            });
    });

    it('remove a post from a user', () => {
        const joe = new User ({
            name: 'Joe',
            posts: [{title: 'New Title'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'} ))
            .then((user) => {
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts.length === 0);
            });
    })
});