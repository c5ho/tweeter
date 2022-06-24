$(document).ready(function() {
  //change colour of text form when focus to the text box
  $("#tweet-text").focus(function() {
    $(this).css("background-color", "#f7e9d3");
  });
  $("#tweet-text").blur(function() {
    $(this).css("background-color", "#f4f1ec");
  });

//   document.getElementById("arabutton").addEventListener("click", function(){
//     setTimeout(function() { jQuery('#ara').focus() }, 20);
// });


})