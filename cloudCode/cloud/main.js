Parse.Cloud.define('getFullData', function getFullData(req, res) {
  var currUserP
  if (req.params.gcid) {
    currUserP = (new Parse.Query('Score')).equalTo('gcid', req.params.gcid).first()
  } else if (req.params.fid) {
    currUserP = (new Parse.Query('Score')).equalTo('fid', req.params.fid).first()
  } else {
    currUserP = Parse.Promise.as({})
  }
 
  var gcFriends = (req.params.gcFriends instanceof Array) ? req.params.gcFriends : []
  var fFriends = (req.params.fFriends instanceof Array) ? req.params.fFriends : []
 
  var friendsP = Parse.Query.or((new Parse.Query('Score')).containedIn('gcid', req.params.gcFriends),
                                (new Parse.Query('Score')).containedIn('fid', req.params.fFriends))
                            .descending('highScore')
                            .find()
 
  Parse.Promise.when(currUserP, friendsP).then(function(currUserResult, friendsResult) {
    res.success({
      current: currUserResult,
      friends: friendsResult
    })
  })
})