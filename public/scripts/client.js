$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    
    tweetData.created_at = timeago.format(tweetData.created_at);

    return(
      `<article class="tweet">
        <header>  
          <div class="avatar-user">
            <span><img src=${tweetData.user.avatars}></span>
            <p class="username">${tweetData.user.name}</p>
          </div>
          <span class="handle">${tweetData.user.handle}</span>
        </header>
        <p class="tweet-content">${tweetData.content.text}</p>
        <footer>
          <span class="tweet-date">${tweetData.created_at}</span>
            <div class="tweet-reactions">
              <span class="flag"><i class="fa-solid fa-flag"></i></span>
              <span class="retweet"><i class="fa-solid fa-retweet"></i></span>
              <span class="heart"><i class="fa-solid fa-heart"></i></span>
            </div>
        </footer>
      </article>`
    );
  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  }

  //!!!what is "event"?
  $('#tweet-submit').submit(function (event) { 
    //prevents default http POST from the tweet form
    event.preventDefault();

    if ($('#counter').text() < 0) {
      $("#tweet-status").text("Sorry, you cannot submit more than 140 characters!").show().fadeOut( 2000 );
    } 
    else if ($('#counter').text() >= 140) {
      $("#tweet-status").text("Sorry, you cannot submit an empty tweet!").show().fadeOut( 2000 );
    } else {
      
      $("#tweet-status").text("Tweet sent!").show().fadeOut( 2000 );

      const tweetEntered = $(this);

      //serialize tweet text for backend consumption
      tweetQueryString = tweetEntered.serialize();
      
      //send AJAX POST request
      // $post("/tweets/", tweetQueryString);
      
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweetQueryString,
        success: function() {
          //resets the tweet form and resets the counter back to 140 characters
          $('#tweet-submit')[0].reset();
          $('#counter').text(140);
          //re-fetches tweets to show submitted tweet
          loadTweets();          
        },


        // error: function(error) {}
        // dataType: dataType


      });

      //$('#tweet-submit').trigger("reset");


    }
  });
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function(tweetData) {
        renderTweets(tweetData);
      }
    })
  }
  
  // const loadTweets = function() {
  //   $.get("/tweets", function(tweetData) {
  //     renderTweets(tweetData);
  //   });
  // };
  
  loadTweets();          


});