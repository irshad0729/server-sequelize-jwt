// Importing modules
const { Sequelize, DataTypes } = require("sequelize");

// Database connection with dialect of postgres specifying the database we are using
// Port for my database is 5433
// Database name is discover
const sequelize = new Sequelize(
  `postgres://postgres:root@localhost:5432/backend`,
  { dialect: "postgres" }
);

// Checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Connecting UserModel
db.users = require("./userModel")(sequelize, DataTypes);

// Connecting BlogModel
db.blogs = require("./blogModel")(sequelize, DataTypes);

// Establish associations here
db.users.hasMany(db.blogs, { foreignKey: 'userId' });
db.blogs.belongsTo(db.users, { foreignKey: 'userId' });

// Export the module
module.exports = db;
