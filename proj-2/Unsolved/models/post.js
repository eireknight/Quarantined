module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  return Post;
};


