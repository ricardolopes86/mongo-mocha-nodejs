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
});