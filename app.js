var Score = Parse.Object.extend("Score")

var log = function (x) { console.log(x) }
var err = function (e) { console.log(e) }

var getFullData = function getFullData(req, res) {
  var currUserP
  if (req.gcid) {
    currUserP = (new Parse.Query('Score')).equalTo('gcid', req.gcid).first()
  } else if (req.fid) {
    currUserP = (new Parse.Query('Score')).equalTo('fid', req.fid).first()
  } else {
    currUserP = Parse.Promise.as({})
  }
 
  var gcFriends = (req.gcFriends instanceof Array) ? req.gcFriends : []
  var fFriends = (req.fFriends instanceof Array) ? req.fFriends : []
 
  var friendsP = Parse.Query.or((new Parse.Query('Score')).containedIn('gcid', req.gcFriends),
                                (new Parse.Query('Score')).containedIn('fid', req.fFriends))
                            .descending('highScore')
                            .find()
 
  var resultP = Parse.Promise.when(currUserP, friendsP).then(function(currUserResult, friendsResult) {
    return { current: currUserResult, friends: friendsResult }
  })

  if (res) {
    resultP.then(res.success, res.error)
  }
  
  return resultP
}

var getFullDataCloud = function getFullDataCloud(req, res) {
  Parse.Cloud.run('getFullData', req, res)
}