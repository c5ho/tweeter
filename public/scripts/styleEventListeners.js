$(document).ready(function() {
  
  const $tweetText = $("#tweet-text");
  const $writeNew = $(".write-new");
  const $scrollUp =  $('#scroll-up');
  const $scrollDown = $(".scroll-down");
  const $mainContainer = $(".main-container")
  const $window = $(window);
  const $html = $("html");
  const $body = $("body");
  

  //changes colour of text form when focus (click) is on the text box*****************************************
  $tweetText.on("focus", function() {
    $(this).css("background-color", "#f7e9d3");
  });
  $tweetText.on("blur", function() {
    $(this).css("background-color", "#f4f1ec");
  });

  //listens for click on scroll-up or write-new, then scrolls up and focuses on tweet entry form field*****
  $writeNew.add($scrollUp).on("click", function() {
    const pageTop = 0;
    $html.add($body).add($mainContainer).animate({
      scrollTop: pageTop
    }, 500);
    $tweetText.focus();
  });
  
  //listens for click on scroll-down and scrolls to page bottom and blurs from tweet entry form field********
  $scrollDown.on("click", function() {
    const pageBottom =$html.add($body).get(0).scrollHeight;
    $html.add($body).add($mainContainer).animate({
      scrollTop: pageBottom
    }, 500);
    $tweetText.blur();
  });
  
  //check scroll and position then show or hide scroll up button*********************************************
  $window.add($mainContainer).on("scroll", function() {
    //if scroll position is lower than 300px from the top of the screen
    if ($(this).scrollTop() >= 300) {
      $scrollUp.addClass("show");
    } else {
      $scrollUp.removeClass("show");
    }
  });
});








  


