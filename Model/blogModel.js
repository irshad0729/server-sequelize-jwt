// Create a Blog model
module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
      blogName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      blogDescription: {
        type: DataTypes.TEXT, // Use TEXT data type for longer descriptions
        allowNull: false,
      },
    });
        
    // Define associations between the Blog and User models
    Blog.associate = (models) => {
      // A Blog belongs to a User (creator)
      Blog.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return Blog;
  };
  