$(document).ready(function() {
  $("#tweet-text").on("input", countCharsLeft);
});

//counts the characters remaining in the tweet entry form
const countCharsLeft = function() {
  let charCount = 0;
  let maxChars = 140;

  charCount = $("#tweet-text").val().length;
  const charLeft = maxChars - charCount;
  
  //#tweet-text counter with reference to 'this' (tweet-text)
  const $counter = $(this).next().children().closest("output").text(charLeft);
  
  //shows remaining character counter in red when less than 0 characters are left
  if (charLeft < 0) {
    $counter.addClass('redHighlight');

  } else {
    $counter.removeClass('redHighlight');
  }
};

