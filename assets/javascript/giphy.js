var x = document.getElementById("myAudio");


function playAudio() {
    x.play();
}


// / Document Ready //

$(document).ready(function() {



// Variables for topic array and new search buttons //

var topics = ["80s Movies", "80s Music", "80s Fashion", "80s Arcade", "80s Television", "80s Technology", "80s Dance", "80s Hair", "80s Toys", "80s Cars"];
var newButtons;

// Functions that generates and stores buttons for topic array // 

function populateButtons() {
    var storeBtns = $("<div>");
    storeBtns.attr("id", "topic-buttons");

    for (var i = 0; i < topics.length; i++) {
        storeBtns.append(getButton(topics[i]));
    }

    $("#button-grp").html(storeBtns);
}

function getButton(topic) {
    var bTag = $("<button>");
    bTag.addClass("topics");
    bTag.attr("data-topic", topic);
    bTag.text(topic);
    return bTag;
}

// Event Listener for 80s buttons //

$("#button-grp").on("click", ".topics", function() {
console.log("working");
var name = $(this).attr("data-topic");
playAudio();


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
            themeImg.attr("data-still", outcome[i].images.fixed_height_still.url);
            themeImg.attr("data-animate", outcome[i].images.fixed_height.url);
            themeImg.attr("data-state", "still");
            themeImg.addClass("displayingGifs");

            gif.append(rateResult);
            gif.append(themeImg);

            $("#gif-placement").prepend(gif);
        }
    }
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

// New search is generated based on USER input, and adds into existing array //

$("form").on("submit", function(event) {
    event.preventDefault();

    var inputSrch = $(this).children("input").val().trim();
    if ((inputSrch !== "") && (!topics.includes(inputSrch))) {
        topics.push(inputSrch);
        populateButtons();
    }
    this.children("input").val("");

});

// Click Gif, still -> animate, click, again, animate -> still //

$("#gif-placement").on("click", ".displayingGifs", function() {
    
    var stateOfGif = $(this).attr("data-state");
    
        if (stateOfGif === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
populateButtons();
});
