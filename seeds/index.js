const seeedUsers = require('./user-seeds');
const seedposts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../congig/connection');

const seedAll =async() => {
    await sequelize.sync({ force: true });
    await seeedUsers();
    await seedposts();
    await seedComments();
    process.exit(0);
};

seedAll();