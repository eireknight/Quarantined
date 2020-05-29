$(document).ready(function() {
  console.log("hello there this is the index.js file");
  // var $drinkList = $("#drink-list");
  // The API object contains methods for each kind of request we'll make
  var API = {
    saveDrink: function(addDrink) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/addDrink",
        data: JSON.stringify(addDrink)
      });
    },
    getDrinks: function() {
      return $.ajax({
        url: "api/drinks",
        type: "GET"
      });
    },
    getOneDrink: function(name) {
      return $.ajax({
        url: "api/drinks/" + name,
        type: "GET"
      });
    }
  };
  var $drinkName = $("#drinkName");
  var $drinkCategory = $("#drinkCategory");
  var $drinkAlcoholic = $("#drinkAlcoholic");
  var $drinkInstructions = $("#drinkInstructions");
  var $drinkIngredients = $("#drinkIngredients");
  var $drinkMeasurements = $("#drinkMeasurements");
  var $drinkImage = $("#drinkImage");
  $("#submitDrink").on("click", function(event) {
    event.preventDefault();
    var addDrink = {
      Name: $drinkName.val().trim(),
      Category: $drinkCategory.val().trim(),
      Alcoholic: $drinkAlcoholic.val().trim(),
      Instructions: $drinkInstructions.val().trim(),
      Ingredients: $drinkIngredients.val().trim(),
      Measurements: $drinkMeasurements.val().trim(),
      Image: $drinkImage.val().trim()
    };
    console.log(addDrink);
    if (
      !(
        addDrink.Name &&
        addDrink.Category &&
        addDrink.Alcoholic &&
        addDrink.Instructions &&
        addDrink.Ingredients &&
        addDrink.Measurements &&
        addDrink.Image
      )
    ) {
      alert("No field can be empty");
      return;
    }
    API.saveDrink(addDrink).then(function() {
      API.getOneDrink(addDrink.Name).then(function(data) {
        renderDrinks(data);
        $drinkName.val("");
        $drinkCategory.val("");
        $drinkAlcoholic.val("");
        $drinkInstructions.val("");
        $drinkIngredients.val("");
        $drinkMeasurements.val("");
        $drinkImage.val("");
      });
    });
  });
  function renderDrinks(data) {
    console.log(data);
    for (var i = 0; i < 1; i++) {
      var div = $("<div class='col-lg-4'>");
      div.append('<img src="' + data.Image + '/preview">');
      div.append("<h3>" + data.Name + "</h3>");
      div.append("<h5>Category: " + data.Category + "</h5>");
      div.append("<h5>Type: " + data.Alcoholic + "</h5>");
      div.append("<h5>Instructions: " + data.Instructions + "</h5>");
      div.append("<h5>Ingredients: " + data.Ingredients + "</h5>");
      div.append("<h5>Measurements: " + data.Measurements + "</h5>");
      $("#drink-list").append(div);
    }
  }
});