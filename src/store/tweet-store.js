
var STATE = new Freezer({
  tweets: []
});

function processDispatch(state, action) {
  switch (action.type) {
    case 'FAVORITE_TWEET':
      state.tweets = state.tweets.map((t)=>{
        var tweet = t;
        if(tweet.id_str === action.id){
          tweet = clone(t);
          tweet.favorited = true;
        }
        return tweet;
      });
      break;
    case 'UNFAVORITE_TWEET':
      state.tweets = state.tweets.map((t)=>{
        var tweet = t;
        if(tweet.id_str === action.id){
          tweet = clone(t);
          tweet.favorited = false;
        }
        return tweet;
      });
      break;
    case 'RETWEET_TWEET':
      state.tweets = state.tweets.map((t)=>{
        var tweet = t;
        if(tweet.id_str === action.id){
          tweet = clone(t);
          tweet.retweeted = true;
        }
        return tweet;
      });
      break;
    case 'UNRETWEET_TWEET':
      state.tweets = state.tweets.map((t)=>{
        var tweet = t;
        if(tweet.id_str === action.id){
          tweet = clone(t);
          tweet.retweeted = false;
        }
        return tweet;
      });
      break;
    case 'ADD_TWEETS':
      state.tweets = state.tweets.concat(action.tweets);
      break;
    default:
      console.error('ACTION UNHANDLED:',action);
  }
};
document.addEventListener('dispatch', function(e){
  var transaction = STATE.get().transact();
  processDispatch(transaction, e.detail);
  STATE.get().run();
});

StoreBehavior = {
  properties: {
    hub: {
      type: Object,
      value: STATE.getEventHub()
    }
  }
};

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}
