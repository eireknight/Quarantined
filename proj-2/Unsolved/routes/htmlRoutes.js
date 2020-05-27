var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.drinks.findAll({}).then(function(dbDrinks) {
      res.render("index", {
        msg: "Welcome!",
        drinks: dbDrinks
      });
    });
  });
  app.get("/register", function(req, res) {
    db.drinks.findAll({}).then(function(dbDrinks) {
      res.render("signup", {
        msg: "Welcome!",
        drinks: dbDrinks
      });
    });
  });
  app.get("/api/newDrink", function() {
    db.drinks.findAll({}).then(function() {});
  });
  // Load example page and pass in an example by id
  app.get("/api/drink/:Name", function(req, res) {
    db.drinks
      .findOne({ where: { Name: req.params.Name } })
      .then(function(dbExample) {
        res.render("example", {
          example: dbExample
        });
      });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
