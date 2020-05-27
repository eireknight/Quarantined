var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  app.get("/", function(req, res) {
    db.Drinks.findAll({}).then(function(dbDrinks) {
      res.render("index", {
        msg: "",
        drinks: dbDrinks
      });
    });
  });

  app.get("/home", function(req, res) {
    db.Drinks.findAll({}).then(function(dbDrinks) {
      res.render("index", {
        msg: "",
        drinks: dbDrinks
      });
    });
  });

  app.get("/register", function(req, res) {
    db.Drinks.findAll({}).then(function(dbDrinks) {
      res.render("signup", {
        msg: "",
        drinks: dbDrinks
      });
    });
  });

  app.get("/login", function(req, res) {
    db.Drinks.findAll({}).then(function(dbDrinks) {
      res.render("login", {
        msg: "",
        drinks: dbDrinks
      });
    });
  });

  app.get("/profile", function(req, res) {
    db.Drinks.findAll({}).then(function(dbDrinks) {
      res.render("profile", {
        msg: "",
        drinks: dbDrinks
      });
    });
  });

  app.get("/submissions", function(req, res) {
    db.Drinks.findAll({}).then(function(dbDrinks) {
      res.render("submissions", {
        msg: "",
        drinks: dbDrinks
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
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
