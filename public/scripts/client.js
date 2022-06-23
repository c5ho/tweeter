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
      alert("Sorry, you cannot submit more than 140 characters!");
    } 
    else if ($('#counter').text() >= 140) {
      alert("Sorry, you cannot submit an empty tweet!")
    } else {
      
      
      
   //   $('#tweet-sbmit').trigger("reset");
      
      
      const tweetEntered = $(this);
      //serialize tweet text for backend consumption
      tweetQueryString = tweetEntered.serialize();
      
      //send AJAX POST request
      // $post("/tweets/", tweetQueryString);
      
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweetQueryString,
      });

      //resets the tweet form and resets the counter back to 140 characters
      $('#tweet-submit')[0].reset();
      $('#counter').text(140);
    }
  });

  // const loadTweets = function(data) {
  //   $.ajax({
  //     type: "GET",
  //     url: "/tweets",
  //     data: data,
  //   }).done(function (tweetData) {
  //     renderTweets(tweetData);
  // });

  const loadTweets = function() {
    $.get("/tweets", function(tweetData) {
      renderTweets(tweetData);
    });
  };
  loadTweets();

});