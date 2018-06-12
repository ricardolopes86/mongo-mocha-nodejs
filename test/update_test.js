const assert = require('assert');
const User = require('../src/users.model');

describe('Updating records', () => {
    let joe;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save()
            .then(() => {
                done();
            });
    });

    function assertName(operation){
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
            });
    }

    it('instance type using set n save', () => {
        joe.set('name', 'Alex');
        assertName(joe.save());
            
    });

    it('', () => {

    });

    it('model instance can update', () => {
        assertName(joe.update({ name: 'Alex'}));
    });

    it('', () => {
        
    });
});