$(document).ready(function() {
  console.log("hello there this is the index.js file");
  // var $drinkList = $("#drink-list");
  // The API object contains methods for each kind of request we'll make
  var API = {
    saveMeal: function(addMeal) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/addMeal",
        data: JSON.stringify(addMeal)
      });
    },
    getMeals: function() {
      return $.ajax({
        url: "api/meals",
        type: "GET"
      });
    },
    getOneMeal: function(name) {
      return $.ajax({
        url: "api/meals/" + name,
        type: "GET"
      });
    }
  };
  var $mealName = $("#mealName");
  var $mealCategory = $("#mealCategory");
  var $mealArea = $("#mealArea");
  var $mealInstructions = $("#mealInstructions");
  var $mealIngredients = $("#mealIngredients");
  var $mealMeasurements = $("#mealMeasurements");
  var $mealImage = $("#mealImage");
  $("#submitMeal").on("click", function(event) {
    event.preventDefault();
    var addMeal = {
      Name: $mealName.val().trim(),
      Category: $mealCategory.val().trim(),
      Area: $mealArea.val().trim(),
      Instructions: $mealInstructions.val().trim(),
      Ingredients: $mealIngredients.val().trim(),
      Measurements: $mealMeasurements.val().trim(),
      Image: $mealImage.val().trim()
    };
    console.log(addMeal);
    if (
      !(
        addMeal.Name &&
        addMeal.Category &&
        addMeal.Area &&
        addMeal.Instructions &&
        addMeal.Ingredients &&
        addMeal.Measurements &&
        addMeal.Image
      )
    ) {
      alert("No field can be empty");
      return;
    }
    API.saveMeal(addMeal).then(function() {
      API.getOneMeal(addMeal.Name).then(function(data) {
        renderMeals(data);
        $mealName.val("");
        $mealCategory.val("");
        $mealArea.val("");
        $mealInstructions.val("");
        $mealIngredients.val("");
        $mealMeasurements.val("");
        $mealImage.val("");
      });
    });
  });
  function renderMeals(data) {
    console.log(data);
    for (var i = 0; i < 1; i++) {
      var div = $("<div class='col-lg-4'>");
      div.append('<img src="' + data.Image + '/preview">');
      div.append("<h3>" + data.Name + "</h3>");
      div.append("<h5>Category: " + data.Category + "</h5>");
      div.append("<h5>Type: " + data.Area + "</h5>");
      div.append("<h5>Instructions: " + data.Instructions + "</h5>");
      div.append("<h5>Ingredients: " + data.Ingredients + "</h5>");
      div.append("<h5>Measurements: " + data.Measurements + "</h5>");
      $("#food-list").append(div);
    }
  }
});