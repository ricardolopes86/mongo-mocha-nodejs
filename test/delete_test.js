const assert = require('assert');
const User = require('../src/users.model');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('model instance remove', () => {
        joe.remove()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user === null);
            });
    });

    it('class method remove', () => {
        //remove a bunch of records with some given criteria
        User.remove({ name: 'Joe'})
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
            });

    });

    it('class method findAndRemove', () => {
        User.findOneAndRemove({ name: 'Joe' })
        .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
            assert(user === null);
        });
    });

    it('class method findByIdAndRemove', () => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
            });
    });
});