var mongodb=require("mongodb");
function dbConnect(cb,req,res){
     var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

	var db=mongodb.MongoClient.connect(uri, function(err, db) {
	  console.log("inside connection");
	 //console.log(db);
	  if(err) throw err;
	  
	  cb(db,req,res);
      return db;
     
});

    //console.log(db);
}
exports.dbConnect=dbConnect;