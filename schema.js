var ejs = require("ejs");
var mongodb=require("mongodb");
var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

function schemaGET(req,res){
   // console.log(req);
     var method=req.param("method");
   
     mongodb.MongoClient.connect(uri, function(err, db) {
         if(err) throw err;
     var schema = db.collection('userschema');
     schema.find({"method":method},{"Datafields":1, "_id":0}).toArray(function (err, docs) {
		console.log("inside" + docs[0].Datafields);
	        if(err) throw err;
	          res.send(docs[0].Datafields);
	          });
     });
}


exports.schemaGET=schemaGET;