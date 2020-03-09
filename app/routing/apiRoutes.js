// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/friends", function(req, res) {
      return res.json(friendsData);
    });

// API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    var bestMatch = {
        name: "",
        photo: "",
        friendDifference: Infinity
      };

      var userData = req.body;
      var userScores = userData.scores;
      var totalDifference;
  
      for (var i = 0; i < friendsData.length; i++) {
        var currentFriend = friendsData[i];
        totalDifference = 0;
  
        console.log(currentFriend.name);
  
        for (var j = 0; j < currentFriend.scores.length; j++) {
          var currentFriendScore = currentFriend.scores[j];
          var currentUserScore = userScores[j];
          totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
        }
  
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = currentFriend.name;
          bestMatch.photo = currentFriend.photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
      friendsData.push(userData);
      res.json(bestMatch);
  });

};