module.exports = function(sequelize, DataTypes) {
  var Drinks = sequelize.define("Drinks", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Alcoholic: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Ingredients: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Measurements: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return Drinks;
};
