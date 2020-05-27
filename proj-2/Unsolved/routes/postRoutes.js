var db = require("../models");
module.exports = function(app) {
  app.get("/api/posts", function(req, res) {
    var query = {};
    db.Post.findAll({
      where: query
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body.text).then(function(dbComment) {
      res.json(dbComment);
    });
  });
  // Needs to increase or decrease by 1
  app.put("/api/votes", function(req, res) {
    console.log("Hello", req.body);
    db.Vote.update(req.body).then(function(dbVote) {
      res.json(dbVote);
    });
  });
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.delete("/api/comments/:id", function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
  app.put("/api/comments", function(req, res) {
    db.Comment.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });
};