var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index", {});
  });
  app.get("/home", function(req, res) {
    res.render("index", {});
  });
  app.get("/register", function(req, res) {
    res.render("signup", {});
  });
  app.get("/login", function(req, res) {
    res.render("login", {});
  });
  app.get("/profile", function(req, res) {
    res.render("profile", {});
  });
  app.get("/submissions", function(req, res) {
    res.render("submissions", {});
  });
  app.get("/forum", function(req, res) {
    res.render("forum", {});
  });
  app.get("/newDrink", function(req, res) {
    db.drinks.findAll({}).then(function(dbDrinks) {
      res.render("newDrink", {
        msg: "",
        drinks: dbDrinks
      });
    });
  });
  app.get("/newMeal", function(req, res) {
    db.meals.findAll({}).then(function(dbMeals) {
      res.render("newMeal", {
        msg: "",
        meals: dbMeals
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
