$(document).ready(function() {
  
  const $tweetText = $("#tweet-text");
  
  //change colour of text form when focus (click) is on the text box
  $tweetText.on('focus', function() {
    $(this).css("background-color", "#f7e9d3");
  });
  $tweetText.on('blur', function() {
    $(this).css("background-color", "#f4f1ec");
  });

  
  
  
  
  
  $(".write-new").on("click", function() {
    const pageTop = 260;
    $("HTML, BODY").animate({
      scrollTop: pageTop
    }, 500);
    $tweetText.focus();
  });

  $(".scroll-down").on("click", function() {
    $("HTML, BODY").animate({
      scrollTop: $(document).height() - $(window).height()
    }, 500);
    $tweetText.blur();
  });




$(function(){
  //Function To Add Class
  function showBackToTop(){
    $('#back-to-top').addClass('show-btt');
  }

  //Function To Add Class
  function hideBackToTop(){
    $('#back-to-top').removeClass('show-btt');
  }

  //Check Scroll and Add Class
  function checkScrollPos(){
    if ($(this).scrollTop() >= 700) { //if scroll position is lower than 700px from the top of the screen
      showBackToTop();
    } else {
      hideBackToTop()
    }
  }
  // tell the browser to run the "checkScrollPos()" function just above when the user scrolls
  $(window).on('scroll', function(){ 
    checkScrollPos();
  });
  //Check the scroll position once when the page loads
  checkScrollPos();
})



  
  
})



  //   document.getElementById("arabutton").addEventListener("click", function(){
//     setTimeout(function() { jQuery('#ara').focus() }, 20);
// });

// $("#write-new-div").on('click', function() {
  //   const position = $("#tweet-text").offset().top;
  //   $("HTML, BODY").animate({
    //       scrollTop: position
//   }, 500);