var db = require("../models")
var axios = require("axios")

module.exports = function(app) {
    // get the latest meals
function latestMeals() {
    axios.get('https://www.themealdb.com/api/json/v2/9973533/latest.php')
     .then(response => {
     
         var meals = [];
        
         for(i = 0; i < 6; i ++) {
          

             meals.push({
                 name: response.data.meals[i].strMeal,
                 image: response.data.meals[i].strMealThumb,
                 ingredients: [
                 response.data.meals[i].strIngredient1,
                 response.data.meals[i].strIngredient2,
                 response.data.meals[i].strIngredient3,
                 response.data.meals[i].strIngredient4,
                 response.data.meals[i].strIngredient5,
                 response.data.meals[i].strIngredient6,
                 response.data.meals[i].strIngredient7,
                 response.data.meals[i].strIngredient8,
                 response.data.meals[i].strIngredient9,
                 response.data.meals[i].strIngredient10,
                 response.data.meals[i].strIngredient11,
                 response.data.meals[i].strIngredient12,
                 response.data.meals[i].strIngredient13,
                 response.data.meals[i].strIngredient14,
                 response.data.meals[i].strIngredient15,
                 response.data.meals[i].strIngredient16,
                 response.data.meals[i].strIngredient17,
                 response.data.meals[i].strIngredient18,
                 response.data.meals[i].strIngredient19,
                 response.data.meals[i].strIngredient20
                 ],
                 measurements: [
                 response.data.meals[i].strMeasure1,
                 response.data.meals[i].strMeasure2,
                 response.data.meals[i].strMeasure3,
                 response.data.meals[i].strMeasure4,
                 response.data.meals[i].strMeasure5,
                 response.data.meals[i].strMeasure6,
                 response.data.meals[i].strMeasure7,
                 response.data.meals[i].strMeasure8,
                 response.data.meals[i].strMeasure9,
                 response.data.meals[i].strMeasure10,
                 response.data.meals[i].strMeasure11,
                 response.data.meals[i].strMeasure12,
                 response.data.meals[i].strMeasure13,
                 response.data.meals[i].strMeasure14,
                 response.data.meals[i].strMeasure15,
                 response.data.meals[i].strMeasure16,
                 response.data.meals[i].strMeasure17,
                 response.data.meals[i].strMeasure18,
                 response.data.meals[i].strMeasure19,
                 response.data.meals[i].strMeasure20
                 ]
             })   
         } 
     })
     .catch(error => {
     console.log(error);
     })
}
     



     //search for a meal given by user
    function searchMeal(userMeal) {
        axios.get("https://www.themealdb.com/api/json/v2/9973533/search.php?s=" + userMeal)
     .then(response => {
             var meal = {
                 name: response.data.meals[0].strMeal,
                 image: response.data.meals[0].strMealThumb,
                 ingredients: [
                 response.data.meals[0].strIngredient1,
                 response.data.meals[0].strIngredient2,
                 response.data.meals[0].strIngredient3,
                 response.data.meals[0].strIngredient4,
                 response.data.meals[0].strIngredient5,
                 response.data.meals[0].strIngredient6,
                 response.data.meals[0].strIngredient7,
                 response.data.meals[0].strIngredient8,
                 response.data.meals[0].strIngredient9,
                 response.data.meals[0].strIngredient10,
                 response.data.meals[0].strIngredient11,
                 response.data.meals[0].strIngredient12,
                 response.data.meals[0].strIngredient13,
                 response.data.meals[0].strIngredient14,
                 response.data.meals[0].strIngredient15,
                 response.data.meals[0].strIngredient16,
                 response.data.meals[0].strIngredient17,
                 response.data.meals[0].strIngredient18,
                 response.data.meals[0].strIngredient19,
                 response.data.meals[0].strIngredient20
                 ],
                 measurements: [
                 response.data.meals[0].strMeasure1,
                 response.data.meals[0].strMeasure2,
                 response.data.meals[0].strMeasure3,
                 response.data.meals[0].strMeasure4,
                 response.data.meals[0].strMeasure5,
                 response.data.meals[0].strMeasure6,
                 response.data.meals[0].strMeasure7,
                 response.data.meals[0].strMeasure8,
                 response.data.meals[0].strMeasure9,
                 response.data.meals[0].strMeasure10,
                 response.data.meals[0].strMeasure11,
                 response.data.meals[0].strMeasure12,
                 response.data.meals[0].strMeasure13,
                 response.data.meals[0].strMeasure14,
                 response.data.meals[0].strMeasure15,
                 response.data.meals[0].strMeasure16,
                 response.data.meals[0].strMeasure17,
                 response.data.meals[0].strMeasure18,
                 response.data.meals[0].strMeasure19,
                 response.data.meals[0].strMeasure20
                 ]} 
                 console.log(meal)
         })
     .catch(error => {
     console.log(error);
     })
    }
     
    

    //get meals by ingredient
function ingredientSearch(ingredient) {
    axios.get('https://www.themealdb.com/api/json/v2/9973533/filter.php?i=' + ingredient)
    .then(response => {

    var meals = [];
    var mealIDs = [];


    console.log(mealIDs)


     for (i = 0; i < 6; i ++) {
         mealIDs.push(response.data.meals[i].idMeal)
     }

     console.log(mealIDs);

     for (i = 0; i < mealIDs.length; i ++) {

    axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealIDs[i])

    .then(response => {
    
        meals.push({
            name: response.data.meals[0].strMeal,
            image: response.data.meals[0].strMealThumb,
            ingredients: [
                response.data.meals[0].strIngredient1,
                response.data.meals[0].strIngredient2,
                response.data.meals[0].strIngredient3,
                response.data.meals[0].strIngredient4,
                response.data.meals[0].strIngredient5,
                response.data.meals[0].strIngredient6,
                response.data.meals[0].strIngredient7,
                response.data.meals[0].strIngredient8,
                response.data.meals[0].strIngredient9,
                response.data.meals[0].strIngredient10,
                response.data.meals[0].strIngredient11,
                response.data.meals[0].strIngredient12,
                response.data.meals[0].strIngredient13,
                response.data.meals[0].strIngredient14,
                response.data.meals[0].strIngredient15,
                response.data.meals[0].strIngredient16,
                response.data.meals[0].strIngredient17,
                response.data.meals[0].strIngredient18,
                response.data.meals[0].strIngredient19,
                response.data.meals[0].strIngredient20
                ],
                measurements: [
                response.data.meals[0].strMeasure1,
                response.data.meals[0].strMeasure2,
                response.data.meals[0].strMeasure3,
                response.data.meals[0].strMeasure4,
                response.data.meals[0].strMeasure5,
                response.data.meals[0].strMeasure6,
                response.data.meals[0].strMeasure7,
                response.data.meals[0].strMeasure8,
                response.data.meals[0].strMeasure9,
                response.data.meals[0].strMeasure10,
                response.data.meals[0].strMeasure11,
                response.data.meals[0].strMeasure12,
                response.data.meals[0].strMeasure13,
                response.data.meals[0].strMeasure14,
                response.data.meals[0].strMeasure15,
                response.data.meals[0].strMeasure16,
                response.data.meals[0].strMeasure17,
                response.data.meals[0].strMeasure18,
                response.data.meals[0].strMeasure19,
                response.data.meals[0].strMeasure20
                ]
        })
        console.log(meals);
        }) 
      }
    })


    .catch(error => {
    console.log(error);
    })

   
}
    

}


axios.get('https://www.themealdb.com/api/json/v2/9973533/latest.php')
     .then(response => {
         for(i = 0; i < 6; i++) {
            console.log(response.data.meals[i]);
         }
     })

     .catch(error => {
     console.log(error);
     })
