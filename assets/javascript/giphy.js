// Array of search topics  and new search //

var topics = ["80s Movies", "80s Music", "80s Fashion", "80s Arcade", "80s Television", "80s Technology", "80s Dance", "80s Hair", "80s Toys", "80s Cars"];
var newSearch = "";
var newButtons;


// / Document Ready //
$(document).ready(function() {

// Event Listener for 80's buttons //

$("button").on("click", function() {

var name = $(this).attr("data-name");

// Store Giphy API URL for "topics" images //

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=l2NLd9V2jVAFIXXXzvaTyyxql5N5pzLc&limit=10";
console.log(queryURL);

// AJAX GET request to the queryURL //

$.ajax({
    url: queryURL,
    method: "GET"
})

// The outcome from the API //

.then(function(response) {
console.log(response);

    var outcome = response.data;

    for (var i = 0; i < outcome.length; i++) {

// Ratings restriction and visibility //
        if (outcome[i].rating !== "r" && outcome[i].rating !== "pg-13") {
            
            var gif = $("<div>");
            var rating = outcome[i].rating;
            var rateResult = $("<p>").text("Rating: " + outcome[i].rating);
            var themeImg = $("<img>");

            themeImg.attr("src", outcome[i].images.fixed_height_still.url);

            gif.append(rateResult);
            gif.append(themeImg);

            $("#gif-placement").prepend(gif);
        }
    }
});

// Click Gif, still -> animate, click, again, animate -> still //

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

// New search is generated based on USER input, and adds into existing array //

$("#submit-button").on("click", function(event) {
    event.preventDefault();
    newSearch = $("#search-bar").val().trim();
    if (newSearch !== "") {
        topics.push(newSearch);
    }
    newBtn();
});

// Function that creates new buttons on the page that are within the array //

var newBtn = function() {
    $("#topic-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            newButtons = $("<button></button>");
            newButtons.addClass("new");
            newButtons.attr("data-name", topics[i]);
            newButtons.html(topics[i]);
            $("#topic-buttons").append(newButtons);
        }
}
});
});

