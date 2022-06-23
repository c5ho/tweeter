// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Mary",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@MaryOliver" },
    "content": {
      "text": "Tell me, what is it you plan to do with your one wild and precious life?"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "James",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@JamesBaldwin" },
    "content": {
      "text": "To act is to be committed, and to be committed is to be in danger."
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Jane",
      "avatars": "https://i.imgur.com/lRUnDgU.png",
      "handle": "@JaneAusten" },
    "content": {
      "text": "Friendship is certainly the finest balm for the pangs of disappointed love."
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {

  const createTweetElement = function(tweetData) {
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
      $('#tweet-container').append($tweet);
    }
  }
  renderTweets(data);  

  //!!!what is "event"?
  $('#tweet-submit').submit(function (event) { 
    const tweetEntered = $(this);
    
    //serialize tweet text for backend consumption
    tweetQueryString = tweetEntered.serialize();

    //send AJAX POST request
    $post("/tweets/", tweetQueryString);
    
    // $.ajax({
    //   type: "POST",
    //   url: "/tweets/",
    //   data: tweetQueryString,
    // });
    
    //prevents default http POST from the tweet form
    event.preventDefault();
  });
});