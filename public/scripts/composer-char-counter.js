$(document).ready(function() {
  //character count for the text form
  let charCount = 0;
  let maxChars = 140;

  $("#tweet-text").on("input", function() {
    charCount = $("#tweet-text").val().length;
    const charLeft = maxChars - charCount;
    
    //#tweet-text counter with reference to 'this' (tweet-text)
    const counter = $(this).next().children().closest("output").text(charLeft);
    
    //shows remaining character counter in red when less than 0 characters are left
    if (charLeft < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }
  });
});

