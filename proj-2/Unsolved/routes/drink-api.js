var db = require("../models");
var axios = require("axios");
var DrinkAPIKey = process.env.DRINK_API_KEY;

module.exports = function (app) {
  app.get("/api/drinks", function (req, res) {
    db.drinks.findAll({}).then(function (dbDrinks) {
      res.json(dbDrinks);
    });
  });
  app.get("/api/drinks/:Name", function (req, res) {
    db.drinks.findOne({
      where: {
        Name: req.params.Name
      }
    }).then(function (dbDrinks) {
      res.json(dbDrinks);
    });
  });
  app.post("/api/addDrink", function(req, res) {
    db.drinks.create(req.body).then(function(dbDrinks) {

      res.json(dbDrinks);
    });
  });

var newDrink = {
    names: [],
    categories: [],
    alcoholic: [],
    instructions: [],
    ingredients: [],
    measurements: [],
    images: []
  }
  
  // get the latest drinks
  function allDrinks() {
    axios.get("https://www.thecocktaildb.com/api/json/" + DrinkAPIKey + "/search.php?s=")
     .then(response => {
         for(i = 0; i < 595; i ++) {
            newDrink.names.push(response.data.drinks[i].strDrink)
            newDrink.categories.push(response.data.drinks[i].strCategory)
            newDrink.alcoholic.push(response.data.drinks[i].strAlcoholic)
            newDrink.instructions.push(response.data.drinks[i].strInstructions)
            newDrink.images.push(response.data.drinks[i].strDrinkThumb).toString();
            function makeArray(obj){
                var result = Object.keys(obj).map(function (key) { 
                    return [key, obj[key]]; 
                });
                return result;
            }
            function isTrue(property){
                if(property[1]!==null){
                    return true
                }
            }
              var newArray = makeArray(response.data.drinks[i]).filter(isTrue);
              // console.log(newArray);
              for (y=0; y < newArray.length; y++){
                if (newArray[y][0].includes("Ingredient")){
                    newDrink.ingredients.push(newArray[y][1])
                }
                else if (newArray[y][0].includes("Measure")){
                    newDrink.measurements.push(newArray[y][1])
                }
            }
            var newIngred = newDrink.ingredients.toString()
            var newMeasure = newDrink.measurements.toString()
            var newImage = newDrink.images.toString()
            db.drinks.create({
              Name: newDrink.names[0],
              Category:  newDrink.categories[0],
              Alcoholic:  newDrink.alcoholic[0],
              Instructions:  newDrink.instructions[0],
              Ingredients:  newIngred,
              Measurements:  newMeasure,
              Image:  newImage
            }).then(function () {
        });
            clearDrinks();
            function clearDrinks(){
                newDrink.names = [];
                newDrink.categories = [];
                newDrink.alcoholic = [];
                newDrink.instructions = [];
                newDrink.ingredients = [];
                newDrink.measurements = [];
                newDrink.images = [];
              }
            } 
        })
     .catch(error => {
     console.log(error);
     })
  }
  allDrinks();
};