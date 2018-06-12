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

    

    it('model instance can update', () => {
        assertName(joe.update({ name: 'Alex'}));
    });

    it('A model class can update', () => {
        assertName(
            User.update({ name: 'Joe'}, { name: 'Alex'} )
        );
        
    });
    
    it('A model class can update one record', () => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'} )
        );

    });

    it('A model class can find a record by ID and update', () => {
        assertName(
            User.findByIdAndUpdate(joe._id, { name: 'Alex'} )
        );
    });
});