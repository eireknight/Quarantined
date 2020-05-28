var db = require("../models");
var axios = require("axios");

module.exports = function (app) {
  app.get("/api/meals", function (req, res) {
    db.meals.findAll({}).then(function (dbMeals) {
      res.json(dbMeals);
    });
  });
  app.get("/api/meals", function (req, res) {
    db.meals.findOne({}).then(function (dbMeals) {
      res.json(dbMeals);
    });
  });
// function postDrink() {


var newMeals = {
    names: [],
    categories: [],
    areas: [],
    instructions: [],
    ingredients: [],
    measurements: [],
    images: []
  }
  // get the latest Meals
  function latestMeals() {
    axios.get("https://www.themealdb.com/api/json/v2/9973533/latest.php")
     .then(response => {
         for(i = 0; i < 1000; i ++) {
            newMeals.names.push(response.data.meals[i].strMeal)
            newMeals.categories.push(response.data.meals[i].strCategory)
            newMeals.areas.push(response.data.meals[i].strArea)
            newMeals.instructions.push(response.data.meals[i].strInstructions)
            newMeals.images.push(response.data.meals[i].strMealThumb)
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
              var newArray = makeArray(response.data.meals[i]).filter(isTrue);
              // console.log(newArray);
              for (y=0; y < newArray.length; y++){
                if (newArray[y][0].includes("Ingredient")){
                    newDrink.ingredients.push(newArray[y][1])
                }
                else if (newArray[y][0].includes("Measure")){
                    newDrink.measurements.push(newArray[y][1])
                }
            }
            var newIngred = newMeals.ingredients.toString()
            var newMeasure = newMeals.measurements.toString()
            console.log("post hit");
            db.meals.create({
              Name: newMeals.names[0],
              Category:  newMeals.categories[0],
              Alcoholic:  newMeals.alcoholic[0],
              Instructions:  newMeals.instructions[0],
              Ingredients:  newIngred,
              Measurements:  newMeasure,
              Images:  newMeals.images[0]
            }).then(function () {
        });
            // postDrink()
            clearMeals();
            function clearMeals(){
                newMeals.names = [];
                newMeals.categories = [];
                newMeals.alcoholic = [];
                newMeals.instructions = [];
                newMeals.ingredients = [];
                newMeals.measurements = [];
                newMeals.images = [];
              }
            } 
        })
     .catch(error => {
     console.log(error);
     })
  }
  latestMeals();


};
