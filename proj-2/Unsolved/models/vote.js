module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    userID: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    voteDirection: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Vote;
};
