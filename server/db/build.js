const dbSession = require('./dbSession');

const User = require('./models/users');
const usersFxs = require('./fixtures/users');


var models = [
    'User',
];


User.sync({ force: false }).then(() => {
    usersFxs.forEach(user => {
        User.create(user);
    });
});

