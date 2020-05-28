module.exports = function(sequelize, DataTypes) {
  var meals = sequelize.define("meals", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Measurements: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return meals;
};