var axios = require("axios")

module.exports = function(appD) {
    appD.get("/api/drinks", function(req, res) {
        db.Drinks.findAll({}).then(function(dbDrinks) {
          res.json(dbDrinks);
        });
      });
      appD.post("/api/newDrink", function(req, res) {
        console.log("Drink Data:");
        console.log(req.body);
        db.Drinks.create({
          Name: req.body.Name,
          Category: req.body.Category,
          Alcoholic: req.body.Alcoholic,
          Instructions: req.body.Instructions,
          Ingredients: req.body.Ingredients,
          Measurements: req.body.Measurements,
          Images: req.body.Images
        }).then(function(results) {
          res.json(results);
        });
      });

    // get the latest meals
function latestDrinks() {
    axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/latest.php')
     .then(response => {
         console.log(response.data);
            var names = [];
            var categories = [];
            var alcoholic = [];
            var instructions = [];
            var ingredients = [];
            var measurements = [];
            var images = [];
         for(i = 0; i < 6; i ++) {
            names.push(response.data.drinks[i].strDrink)
            categories.push(response.data.drinks[i].strCategory)
            alcoholic.push(response.data.drinks[i].strAlcoholic)
            instructions.push(response.data.drinks[i].strInstructions)
            images.push(response.data.drinks[i].strDrinkThumb)
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
            console.log(categories);
            console.log(alcoholic);
            console.log(instructions);
            console.log(ingredients);
            console.log(measurements);
            console.log(images);
        })
     .catch(error => {
     console.log(error);
     })
}
latestDrinks();


    //search for a drink given by user
function searchDrink(userDrink) {
    axios.get("https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=" + userDrink)
        .then(response => {
            var names = [];
            var categories = [];
            var alcoholic = [];
            var instructions = [];
            var ingredients = [];
            var measurements = [];
            var images = [];
            names.push(response.data.drinks[0].strDrink)
            categories.push(response.data.drinks[0].strCategory)
            alcoholic.push(response.data.drinks[0].strAlcoholic)
            instructions.push(response.data.drinks[0].strInstructions)
            images.push(response.data.drinks[0].strDrinkThumb)
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
            var newArray = makeArray(response.data.drinks[0]).filter(isTrue);
            // console.log(newArray);
            for (y=0; y < newArray.length; y++){
                if (newArray[y][0].includes("Ingredient")){
                    ingredients.push(newArray[y][1])
                }
                else if (newArray[y][0].includes("Measure")){
                    measurements.push(newArray[y][1])
                }
        }
         })
     .catch(error => {
     console.log(error);
     })
    }

//get drinks by ingredient
function ingredientSearch(ingredient) {
    axios.get('https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=' + ingredient)
    .then(response => {
        var names = [];
        var categories = [];
        var alcoholic = [];
        var instructions = [];
        var ingredients = [];
        var measurements = [];
        var images = [];
        names.push(response.data.drinks[0].strDrink)
        categories.push(response.data.drinks[0].strCategory)
        alcoholic.push(response.data.drinks[0].strAlcoholic)
        instructions.push(response.data.drinks[0].strInstructions)
        images.push(response.data.drinks[0].strDrinkThumb)
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
        var newArray = makeArray(response.data.drinks[0]).filter(isTrue);
        // console.log(newArray);
        for (y=0; y < newArray.length; y++){
            if (newArray[y][0].includes("Ingredient")){
                ingredients.push(newArray[y][1])
            }
            else if (newArray[y][0].includes("Measure")){
                measurements.push(newArray[y][1])
            }
    }
})
.catch(error => {
console.log(error);
})
};
};