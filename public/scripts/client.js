$(document).ready(function() {
  submitTweetFromForm();
  loadTweetsToTweeter();
});


//escapes submitted text in tweet form to prevent cross site scripting***************************************
const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

  
//extracts tweet data and appends it to tweet in HTML on main page*******************************************
const createTweetElement = function(tweetData) {
  
  //converts universal time to "how long ago"
  const tweetCreatedAt = timeago.format(tweetData.created_at);
  
  //escapes the tweet text to remove scripting elements
  const tweetContentEscaped = escapeText(tweetData.content.text);

  return (
    `<article class="tweet">
      <header>  
        <div class="avatar-user">
          <span><img src=${tweetData.user.avatars}></span>
          <p class="username">${tweetData.user.name}</p>
        </div>
        <span class="handle">${tweetData.user.handle}</span>
      </header>
      <p class="tweet-content">${tweetContentEscaped}</p>
      <footer>
        <span class="tweet-date">${tweetCreatedAt}</span>
          <div class="tweet-reactions">
            <span class="flag"><i class="fa-solid fa-flag"></i></span>
            <span class="retweet"><i class="fa-solid fa-retweet"></i></span>
            <span class="heart"><i class="fa-solid fa-heart"></i></span>
          </div>
      </footer>
    </article>`
  );
};


//submits tweet from new tweet form**************************************************************************
const submitTweetFromForm = function() {
  $('#tweet-submit').submit(function(event) {

    //prevents default http POST from the tweet form
    event.preventDefault();

    let $counter = $('#counter').text();
    let $tweetStatus = $("#tweet-status");

    //shows error for tweet too long submitted
    if ($counter < 0) {
      $tweetStatus.slideUp();
      $tweetStatus.text("You've got too much to say.  Get to the point! 🤭").slideDown();
    
    //shows error for empty tweet submitted
    } else if ($counter >= 140) {
      $tweetStatus.slideUp();
      $tweetStatus.text("Nothing to say? I'm sure you can think of something! 😏").slideDown();
    
    } else {
      $tweetStatus.slideUp();
      $tweetStatus.text("Success! You did it! 👌").slideDown().fadeOut(2000);

      const tweetDataSubmitted = $(this);

      //serialize tweet text for backend consumption
      const tweetDataSerialized = tweetDataSubmitted.serialize();
      
      //sends AJAX POST request to add tweet to data object
      $.post("/tweets", tweetDataSerialized)
        .then(function() {
          //resets the tweet form and resets the counter back to 140 characters
          $('#tweet-submit')[0].reset();
          $('#counter').text(140);
          //re-fetches tweets to show submitted tweet
          loadTweetsToTweeter();
        }
      );
    }
  });
};


//sends AJAX GET request to get tweet object and calls renderTweets******************************************
const loadTweetsToTweeter = function() {

  $.get("/tweets")
    .then(function(tweetData) {
      $('#tweet-container').empty();
      renderTweets(tweetData);
    }
  );
};


//iterates through tweet object and calls createTweetElement for each tweet**********************************
const renderTweets = function(tweets) {

  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').prepend($tweet);
  }
};