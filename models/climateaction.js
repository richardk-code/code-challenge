var mongoose = require("mongoose");

var climateactionSchema = new mongoose.Schema({
	name: String,
	category: String,
	carbonreduction: String,
	image: String,
	description: String,
	source: String,
	author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
	comments: [
	{
	type: mongoose.Schema.Types.ObjectId,
	ref: "Comment"
	}
	]
});

module.exports = mongoose.model("Climateaction", climateactionSchema);