const assert = require('assert');
const User = require('../src/users.model');
describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({ name: "Jose" });
        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
        });
        
    });
});