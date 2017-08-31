var friends = require("../data/friends.js");
var path = require("path");



module.exports = function(app){
	app.get("/api/friends",function(req,res){
		res.json(friends);
	});
	app.post('/api/friends', function(req, res){

		var greatMatch = {
			name: "",
			photo: "",
			matchDifference: 1000
		};
		var userData 	= req.body;
		var userName 	= userData.name;
		var userphoto 	= userData.photo;
		var userScores 	= userData.scores;

		var totalDifference = 0;

		//loop through the friends data array of objects to get each friends scores
		for(var i = 0; i < friends.length; i++){
			console.log(friends[i].name);
			totalDifference = 0;

			//loop through that friends score and the users score and calculate the 
			// absolute difference between the two and push that to the total difference variable set above
			for(var j = 0; j < friends[i].scores[j]; j++){
				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= greatMatch.matchDifference){

					// Reset the bestMatch to be the new friend. 
					greatMatch.name = friends[i].name;
					greatMatch.photo = friends[i].photo;
					greatMatch.matchDifference = totalDifference;
				}
			}
		}

		friends.push(userData);
 
		res.json(greatMatch);
	});
};