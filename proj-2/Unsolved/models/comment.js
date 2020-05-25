module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    text: {
      type: DataTypes.TEXT,
      allownull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Comment;
};
