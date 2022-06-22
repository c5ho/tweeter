$(document).ready(function() {
  // console.log('loading into index successful');
  // console.log($("#tweet-text").parent());
  // console.log($(".tweet-form").children());
  // console.log($("#tweet-text").parent().children());
  // console.log($(".tweet-submit").children());
  // console.log($("#tweet-text").next());
  // console.log($("#tweet-text").next().children());
  // console.log($("#tweet-text").next().closest("output"));

  //change colour of text form when focus to the text box
  $("#tweet-text").focus(function() {
    $(this).css("background-color", "#f7e9d3");
  });
  $("#tweet-text").blur(function() {
    $(this).css("background-color", "#f4f1ec");
  });

  //character count for the text form
  let charCount = 0;
  let maxChars = 10;

  $("#tweet-text").on("input", function() {
    charCount = $("#tweet-text").val().length;
    const charLeft = maxChars - charCount;  
    
    //#tweet-text counter with reference to this (tweet-text)
    const counter = $(this).next().children().closest("output").text(charLeft);
        
    if (charLeft < 0) {
      counter.css("color", "red");
    }
    else {
      counter.css("color", "white");
    }
  });
});

