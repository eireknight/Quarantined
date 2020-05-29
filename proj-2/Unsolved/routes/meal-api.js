var db = require("../models");
var axios = require("axios");
var MealAPIKey = process.env.MEAL_API_KEY;

module.exports = function (app) {
  app.get("/api/Meals", function (req, res) {
    db.meals.findAll({}).then(function (dbMeals) {
      res.json(dbMeals);
    });
  });
  app.get("/api/Meals/:Name", function (req, res) {
    db.meals.findOne({
      where: {
        Name: req.params.Name
      }
    }).then(function (dbMeals) {
      res.json(dbMeals);
    });
  });
  app.post("/api/addMeal", function(req, res) {
    db.meals.create(req.body).then(function(dbMeals) {
      res.json(dbMeals);
    });
  });
var newMeal = {
    names: [],
    categories: [],
    area: [],
    instructions: [],
    ingredients: [],
    measurements: [],
    images: []
  }
  // get the latest meals
  function allMeals() {
    axios.get("https://www.themealdb.com/api/json/" + MealAPIKey + "/search.php?s=")
     .then(response => {
         for(i = 0; i < 236; i ++) {
            newMeal.names.push(response.data.meals[i].strMeal)
            newMeal.categories.push(response.data.meals[i].strCategory)
            newMeal.area.push(response.data.meals[i].strArea)
            newMeal.instructions.push(response.data.meals[i].strInstructions)
            newMeal.images.push(response.data.meals[i].strMealThumb).toString();
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
                    newMeal.ingredients.push(newArray[y][1])
                }
                else if (newArray[y][0].includes("Measure")){
                    newMeal.measurements.push(newArray[y][1])
                }
            }
            var newIngred = newMeal.ingredients.toString()
            var newMeasure = newMeal.measurements.toString()
            var newImage = newMeal.images.toString()
            db.meals.create({
              Name: newMeal.names[0],
              Category:  newMeal.categories[0],
              Area:  newMeal.area[0],
              Instructions:  newMeal.instructions[0],
              Ingredients:  newIngred,
              Measurements:  newMeasure,
              Image:  newImage
            }).then(function () {
        });
            clearMeals();
            function clearMeals(){
                newMeal.names = [];
                newMeal.categories = [];
                newMeal.area = [];
                newMeal.instructions = [];
                newMeal.ingredients = [];
                newMeal.measurements = [];
                newMeal.images = []; 
              }
            } 
        })
     .catch(error => {
     console.log(error);
     })
  }
  allMeals();
};