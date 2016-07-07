// STATE = Rx.Observable
var STATE = {
  tweets: []
};
const dispatchHandler = Rx.Observable.fromEvent(document, 'dispatch');

function appReducer(state, action) {

  switch (action.type) {
    case 'FAVORITE_TWEET':
      state.tweets = state.tweets.map((t)=>{
        var tweet = clone(t);
        if(t.id_str === action.id){
          tweet.favorited = true;
        }
        return tweet;
      });
      break;
    case 'UNFAVORITE_TWEET':
      state.tweets = state.tweets.map((t)=>{
        var tweet = clone(t);
        if(t.id_str === action.id){
          tweet.favorited = false;
        }
        return tweet;
      });
      break;
    case 'ADD_TWEETS':
      state.tweets = state.tweets.concat(action.tweets);
      break;
    default:

  }
  return state;
};

StoreBehavior = {

  properties: {
    STATE: {
      type: Object,
      value: dispatchHandler
    }
  },

  created: function() {
    this.STATE = dispatchHandler
      .map((e)=> e.detail)
      .startWith(STATE)
      .scan(appReducer);
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
