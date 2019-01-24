// Document Ready //
$(document).ready(function() {

// Array of search topics //

var topics = ["80's Movies", "80's Music", "80's Fashion", "80's Arcade", "80's Television", "80's Technology", "80's Dance", "80's Hair", "80's Toys", "80's Cars"];

// Event Listener for 80's buttons //

$("button").on("click", function() {

var theme = $(this).attr("data-theme");

$(".gif").on("click", function() {
    
var data = $(this).attr("data-state");

    if (data === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

// Store Giphy API URL for "topics" images //

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme + "&api_key=l2NLd9V2jVAFIXXXzvaTyyxql5N5pzLc";

// AJAX GET request to the queryURL //

$.ajax({
    url: queryURL,
    method: "GET"
})

.then(function(response) {

    var outcome = response.data;

    for (var i = 0; i < outcome.length; i++) {
        if (outcome[i].rating !== "r" && outcome[i].rating !== "pg-13") {
            
            var gif = $("<div>");
            var rating = outcome[i].rating;
            var rateResult = $("<p>").text("Rating: " + outcome[i].rating);
            var themeImg = $("<img>");

            themeImg.attr("src", outcome[i].images.fixed_height.url);

            gif.append(p);
            gif.append(themeImg);

            $("#gif-placement").prepend(gif);
        }
    }
});


});
});