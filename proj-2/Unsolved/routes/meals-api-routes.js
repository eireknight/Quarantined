var db = require("../models");
var axios = require("axios");
var name = "";

module.exports = function(app) {
// Get all drinks
app.get("/api/meals", function(req, res) {
  db.Drinks.findAll({}).then(function(dbDrinks) {
    res.json(dbDrinks);
  });
});

app.post("/api/newMeal", function(req, res) {
  console.log("Meal Data:");
  console.log(req.body);
  db.Meals.create({
    Name: req.body.Name,
    Category: req.body.Category,
    Area: req.body.Area,
    Instructions: req.body.Instructions,
    Ingredients: req.body.Ingredients,
    Measurements: req.body.Measurements,
    Images: req.body.Images
  }).then(function(results) {
    res.json(results);
  });
});

  axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=' + name)
  .then(response => {
  console.log(response.data);
  var names = [];
    var categories = [];
    var area = [];
    var instructions = [];
    var ingredients = [];
    var measurements = [];
    var images = [];
    
    for(i = 0; i < 6; i ++) {
  
      names.push(response.data.meals[i].strDrink)
      categories.push(response.data.meals[i].strCategory)
      area.push(response.data.meals[i].strArea)
      instructions.push(response.data.meals[i].strInstructions)
      images.push(response.data.meals[i].strDrinkThumb)
  
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
      ingredients.push(newArray[y][1])
    }
    else if (newArray[y][0].includes("Measure")){
      measurements.push(newArray[y][1])
    }
  }
  } 
    console.log(names);
    console.log(area);
    console.log(instructions);
    console.log(ingredients);
    console.log(measurements);
    console.log(images);
  })
  .catch(error => {
    console.log(error);
  })
  .catch(error => {
  console.log(error);
  })
};



