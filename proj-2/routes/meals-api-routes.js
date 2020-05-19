var db = require("../models")
var axios = require("axios")

module.exports = function(app) {


}




axios.get('https://www.themealdb.com/api/json/v2/9973533/latest.php')
.then(response => {
    var names = [];
    var images = [];
    var ingredients = [];
    var measurements = [];

    for(i = 0; i < 6; i ++) {

        names.push(response.data.meals[i].strMeal)
        images.push(response.data.meals[i].strMealThumb)
       

        for (x = 1; x < 5; x ++) {
        
        

        ingredients.push(response.data.meals[i].strIngredient1)
        }
    }
    console.log(names)
    console.log(images)
    console.log(ingredients)
})
.catch(error => {
console.log(error);
})



