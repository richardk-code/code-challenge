var mongoose = require("mongoose");
var Climateaction = require("./models/climateaction");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Planting 100 trees", 
        image: "https://images.unsplash.com/photo-1505235687559-28b5f54645b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1790&q=80",
		carbonreduction: "2.178",
		category: "Global",
        description: "Every living thing on Earth is made up of four basic elements - carbon, hydrogen, oxygen and nitrogen. Those four elements make up about 96 percent of your body, and most of a tree's roots, trunk, branches, and leaves. While we humans get most of our carbon through eating, trees breathe it in the way that we breathe in oxygen. When a tree breathes, it inhales carbon dioxide and exhales oxygen - the exact opposite of humans. As a tree matures, it can consume 48 pounds of carbon dioxide per year (among other greenhouse gases like ozone), and releases enough oxygen for you to breathe for two years! Removing carbon dioxide from the atmosphere and releasing oxygen in its stead also helps limit global warming, providing for a cleaner, healthier climate. So, by planting trees, you can help clean the air and fight climate change!",
		source: "https://onetreeplanted.org/blogs/stories/planting-trees-reduce-carbon-footprint",
		author:{
            id : "588c2e092403d111454fff76",
            username: "Greta"
        }
    },
    {
        name: "Banning Nationalflights in Germany", 
        image: "https://images.unsplash.com/photo-1421789497144-f50500b5fcf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
		carbonreduction: "2500000",
		category: "National",
        description: "When was the last time you traveled by plane? As little as 3 percent of the global population flew in 2017, and at most, only about 18 percent have ever done so. But things are changing. According to International Civil Aviation Organization (ICAO) estimates, there were 3.7 billion global air passengers in 2016 — and every year since 2009 has been a new record-breaker. By 2035, the International Air Transport Association (IATA) predicts a rise to 7.2 billion. Like the planes themselves, the numbers just keep going up. And given the damage flying does to the planet, that is food for thought.Many estimates put aviation's share of global CO2 emissions at just above 2 percent. That's the figure the industry itself generally accepts. Other aviation emissions such as nitrogen oxides (NOx), water vapor, particulates, contrails and cirrus changes have additional warming effects.",
		source: "https://www.quarks.de/technik/mobilitaet/das-passiert-wenn-wir-alle-innerdeutschen-fluege-abschaffen/",
	author:{
            id : "588c2e092403d111454fff77",
            username: "Greta"
		}
	}
];

function seedDB(){
   Climateaction.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed climateactions!");
        data.forEach(function(seed){
            Climateaction.create(seed, function(err, climateaction){
                if(err){
                    console.log(err);
                } else {
                    console.log("added climateaction");
                    //create a comment
                    Comment.create(
                        {
                            text: "Humans are very adaptable: we can still fix this. But the opportunity to do so will not last for long. We must start today. We have no more excuses.",
                            author:{
            id : "588c2e092403d111454fff76",
            username: "Greta"
        }
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                climateaction.comments.push(comment);
                                climateaction.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
}

module.exports = seedDB;