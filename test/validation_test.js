const assert = require('assert');
const User = require('../src/users.model');

describe('Validation of records', () => {
    it('requires a username', () => {
        const user = new User ({name: undefined});
        const validationResult = user.validateSync();

        const { message } = validationResult.errors.name;

        assert( message === 'User name required.');
    });

    it('requires a username at least 2 chars', () => {
        const user = new User ({name: 'Al', postCount: 2});
        const validationResult = user.validateSync();

        const { message } = validationResult.errors.name;

        assert( message === 'Name must be greater than 2 characters.');
    });

    it('not allow how to save a record to the database', () => {
        const user = new User({ name: 'Al' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;

                assert(message === 'Name must be greater than 2 characters.');
            });
    })
});