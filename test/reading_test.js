const assert = require('assert');
const User = require('../src/users.model');

describe('Reading users from the DB', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => done());
    });

    it('finds all users with a name of joe', () => {
        User.find({name: 'Joe'})
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString());
            });
    });

    it('find a user joe with a specific id', () => {
        User.findOne({_id: joe._id})
            .then((user) => {
                assert(user.name === 'Joe');
            });
    });
});