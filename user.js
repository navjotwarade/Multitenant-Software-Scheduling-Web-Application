var ejs = require("ejs");
var mongodb=require("mongodb");



function user(req,res){
     ejs.renderFile('./views/createUser.ejs',function(err, result) {
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
function  userGET(req,res){
    
    //var type=req.params(); //select which type to handle whether waterfall,scrumm,kanban
    var projID=req.param("project_id");
    var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';
//will check which type of tenant it is using if
   projID="w101";
	mongodb.MongoClient.connect(uri, function(err, db) {
	    
	     if(err) throw err;
    
    //db.bios.find( { _id: 5 } )
    var categories = db.collection('userdata');
    categories.find({"projectID":projID}).toArray(function (err, docs) {
			console.log("inside");
			console.log(docs);
	          if(err) throw err;
	          res.send(docs);
	          });
    
});
}

function userPOST(req,res){
  
     console.log(req.body);
       
    var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

	mongodb.MongoClient.connect(uri, function(err, db) {
	    
	     if(err) throw err;
    
    var categories = db.collection('userdata');
  
      categories.insert(req.body, {w:1}, function(err, result) {
          
      }); 
});
    
	      

}
function userPUT(req,res){
      
    var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

	mongodb.MongoClient.connect(uri, function(err, db) {
	    
	     if(err) throw err;
    
    var categories = db.collection('userdata');
    
    ///db.myCollection.update({project_id: projID}, { $set: { field2:"task"}, false, true);
    categories.update({},function(err,docs){
        console.log("inside");
			console.log(docs);
	          if(err) throw err;
	          res.send(docs);
	          
        
    });
			
});
}
function userDELETE(req,res){
    var pid=req.param();
      
    var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

	mongodb.MongoClient.connect(uri, function(err, db) {
	    pid=11;
	     if(err) throw err;
    
    var categories = db.collection('userdata');
    categories.remove({"projectID":pid},function(err,docs){
        if(err) throw err;
	       else
	          res.send("Delete:Success");
	          
        });
		
	          
	});   
    

}
function login(req,res){
    ejs.renderFile('./views/index.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(result);
        }
        // render or error
        else {

            res.end('An error occurred');
            console.log(err);
        }
    });
    
}
function userHome(req,res){
    ejs.renderFile('./views/userHome.ejs',function(err, result) {
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
 
    var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';
   console.log("username:"+ user + "password"+passwd);
	mongodb.MongoClient.connect(uri, function(err, db) {
	    
	     if(err) throw err;
    
    var categories = db.collection('users');
   categories.find({$and:[{"email":{$eq:user}},{"password":{$eq:passwd}}]}).toArray(function (err, docs) {
        if(err) throw err;
	       console.log(docs[0].method);
	      //docs.proj_id
	      var method = docs[0].method;
	      var a = db.collection('userschema');       
	      
	      a.find({"method":method},{"Datafields":1, "_id":0}).toArray(function (err, docs) {
	          //console.log(docs);
	          res.send(docs);                     //send schema rows
	            
	      });
        });
	         
	});   
}
function createUser(req,res){      // creates user at the create user page
    
    console.log(req.body);
    
    var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

	mongodb.MongoClient.connect(uri, function(err, db) {
	    
	       if(err) throw err;
    
    var categories = db.collection('users');
          categories.insert(req.body, {w:1}, function(err, result) {}); 
	    
        });
}

exports.user=user;
exports.userGET=userGET;
//exports.schemaGET=schemaGET;    
exports.userPOST=userPOST;
exports.userPUT=userPUT;
exports.userDELETE=userDELETE;
exports.login=login;
exports.createUser=createUser;
exports.after_login=after_login;
exports.userHome=userHome;

/*
POST            Creates a new resource.
GET             Retrieves a resource.
PUT             Updates an existing resource.
DELETE          Deletes a resource.
*/
