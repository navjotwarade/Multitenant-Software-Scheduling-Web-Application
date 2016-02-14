
var ejs = require("ejs");
var mongodb=require("mongodb");
var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

function login(req,res){
    ejs.renderFile('./views/index.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
    
}

function after_login(req,res){
     var user =req.param("usr");
  var passwd=req.param("password");
 
    
   console.log("username:"+ user + "password"+passwd);
	mongodb.MongoClient.connect(uri, function(err, db) {
	    
	     if(err) throw err;
    
    var categories = db.collection('users');
   categories.find({$and:[{"email":{$eq:user}},{"password":{$eq:passwd}}]}).toArray(function (err, docs) {   //email->username
       console.log(docs[0].method);
        if(err) throw err;
	       //console.log(docs[0].method);
	      //docs.proj_id
	      var method = docs[0].method;
	      var a = db.collection('userschema');       
	      
	      a.find({"method":method},{"Datafields":1, "_id":0}).toArray(function (err, docs) {
	          if(err) throw err;
	          //console.log(docs);
	          res.send(docs);                     //send schema rows
	            
	      });
        });
	         
	});   
}

exports.login=login;

exports.after_login=after_login;