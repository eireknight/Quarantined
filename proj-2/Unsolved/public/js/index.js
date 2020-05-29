$(document).ready(function() {
  console.log("hello there this is the index.js file");
  // var $drinkList = $("#drink-list");
  // The API object contains methods for each kind of request we'll make
  var API = {
    saveDrink: function(newDrink) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/newDrink",
        data: JSON.stringify(newDrink)
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
    },
    saveMeal: function(newMeal) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/newMeal",
        data: JSON.stringify(newMeal)
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
  var $selection;
  $("#search").on("click", function(event) {
    event.preventDefault();
    $selection = $("#MDSelect").val();
    console.log($selection);
    console.log("the click worked");
    if ($selection === "food") {
      var mealSearched = $("#searchTerm").val();
      API.getOneMeal(mealSearched).then(function(data) {
        renderMeals(data);
      });
    } else if ($selection === "drink") {
      var drinkSearched = $("#searchTerm").val();
      API.getOneDrink(drinkSearched).then(function(data) {
        renderDrinks(data);
      });
    }
  });
  function renderDrinks(data) {
    console.log(data);
    for (var i = 0; i < 1; i++) {
      var div = $("<div class='col-lg-4'>");
      div.append("<img src=\"" + data.Image + "/preview\">");
      div.append("<h3>" + data.Name + "</h3>");
      div.append("<h5>Category: " + data.Category + "</h5>");
      div.append("<h5>Alcoholic: " + data.Alcoholic + "</h5>");
      div.append("<h5>Instructions: " + data.Instructions + "</h5>");
      div.append("<h5>Ingredients: " + data.Ingredients + "</h5>");
      div.append("<h5>Measurements: " + data.Measurements + "</h5>");
      $("#drink-Search").append(div);
    }
  }
  function renderMeals(data) {
    console.log(data);
    for (var i = 0; i < 1; i++) {
      var div = $("<div class='col-lg-4'>");
      div.append("<img src=\"" + data.Image + "/preview\">");
      div.append("<h3>" + data.Name + "</h3>");
      div.append("<h5>Category: " + data.Category + "</h5>");
      div.append("<h5>Area: " + data.Area + "</h5>");
      div.append("<h5>Instructions: " + data.Instructions + "</h5>");
      div.append("<h5>Ingredients: " + data.Ingredients + "</h5>");
      div.append("<h5>Measurements: " + data.Measurements + "</h5>");
      $("#food-Search").append(div);
    }
  }
  var topD = 0;
  function topDrinks() {
    if (topD === 0) {
      topD = 1;
      var drinkSearched = "Margarita";
      API.getOneDrink(drinkSearched).then(function(data) {
        renderTopDrinks(data);
        topDrinks();
      });
    } else if (topD === 1) {
      topD = 2;
      var drinkSearched = "Bellini";
      API.getOneDrink(drinkSearched).then(function(data) {
        renderTopDrinks(data);
        topDrinks();
      });
    } else if (topD === 2) {
      var drinkSearched = "Mai Tai";
      API.getOneDrink(drinkSearched).then(function(data) {
        renderTopDrinks(data);
      });
    }
  }
  topDrinks();
  var topM = 0;
  function topMeals() {
    if (topM === 0) {
      topM = 1;
      var mealSearched = "Pumpkin Pie";
      API.getOneMeal(mealSearched).then(function(data) {
        renderTopMeals(data);
        topMeals();
      });
    } else if (topM === 1) {
      topM = 2;
      var mealSearched = "Ratatouille";
      API.getOneMeal(mealSearched).then(function(data) {
        renderTopMeals(data);
        topMeals();
      });
    } else if (topM === 2) {
      var mealSearched = "Christmas Cake";
      API.getOneMeal(mealSearched).then(function(data) {
        renderTopMeals(data);
      });
    }
  }
  topMeals();
  function renderTopDrinks(data) {
    console.log(data);
    for (var i = 0; i < 1; i++) {
      var div = $("<div class='col-lg-4'>");
      div.append("<img src=\"" + data.Image + "/preview\">");
      div.append("<h3>" + data.Name + "</h3>");
      div.append("<h5>Category: " + data.Category + "</h5>");
      div.append("<h5>Alcoholic: " + data.Alcoholic + "</h5>");
      div.append("<h5>Instructions: " + data.Instructions + "</h5>");
      div.append("<h5>Ingredients: " + data.Ingredients + "</h5>");
      div.append("<h5>Measurements: " + data.Measurements + "</h5>");
      $("#drink-list").append(div);
    }
  }
  function renderTopMeals(data) {
    console.log(data);
    for (var i = 0; i < 1; i++) {
      var div = $("<div class='col-lg-4'>");
      div.append("<img src=\"" + data.Image + "/preview\">");
      div.append("<h3>" + data.Name + "</h3>");
      div.append("<h5>Category: " + data.Category + "</h5>");
      div.append("<h5>Area: " + data.Area + "</h5>");
      div.append("<h5>Instructions: " + data.Instructions + "</h5>");
      div.append("<h5>Ingredients: " + data.Ingredients + "</h5>");
      div.append("<h5>Measurements: " + data.Measurements + "</h5>");
      $("#food-list").append(div);
    }
  }
});
