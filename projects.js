var ejs = require("ejs");
var mongodb=require("mongodb");
//var =require('/views/schema.js');
var dbconn = require("./Connection.js");

var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

function  projectsGET(req,res){
    
  
  //  console.log(db);
    var user=req.param("userID"); //select which type to handle whether waterfall,scrumm,kanban
    	console.log(user);
  
//will check which type of tenant it is using if
	mongodb.MongoClient.connect(uri, function(err, db) {
	   if(err) throw err;
	   	console.log("inside get projects"); 
	    var categories = db.collection('users');
    categories.find({"email":user}).toArray(function (err, docs) {
		          //display only the value
		
	          if(err) throw err;
	          res.send(docs[0].proj_id);
	          });
	});
	
}
function getProjectsDetails(req,res){
	console.log("innnn");
	
	 var proj_Id=req.param('pid');
	 console.log(" proj_Id:"+proj_Id);
  
   
	mongodb.MongoClient.connect(uri, function(err, db) {
	   if(err) throw err;
	   	console.log("inside get projects details"); 
	    var categories = db.collection('userdata');
    categories.find({"projectID":proj_Id},{}).toArray(function (err, docs) {
		          //display only the value
		console.log(docs);
	          if(err) throw err;
	          res.send(docs);
	          });
	});
}	
function deleteProjectsDetails(req,res){
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
function updateProjectDetails(req,res){
     var dat=req.param("data");	
     var Index = dat.Index;
     console.log(Index);
     var projectID = req.param("projectID");
     console.log("got project Id: "+projectID);
   for (var i in dat) {
              console.log("key: "+i+" value: "+dat[i]);
           }
           
    var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

	mongodb.MongoClient.connect(uri, function(err, db) {
	    
	     if(err) throw err;
    
    var categories = db.collection('userdata');
    
    //db.myCollection.update({project_id: projID}, { $set: { field2:"task"}, false, true);
    categories.update({"projectID":projectID,"data.Index":Index},{$set:{"data.$":dat}},function(err,docs){
    	
        console.log("inside");
			console.log(docs);
	          if(err) throw err;
	          res.send(docs[0]);
	          
        
    });
			
});
}

function createProject(req,res){
	
console.log(req.body+uri);
	  ejs.renderFile('./views/createProject.ejs',function(err, result) {
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

function createProjectsDetails(req,res){
  
     console.log(req.body);
       var method = req.param("method");
    var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

	mongodb.MongoClient.connect(uri, function(err, db) {
	    
	     if(err) throw err;
    console.log("this is method: "+ method);
    var categories = db.collection('userdata');
    var users = db.collection('users');
             categories.find({"type":method},{"_id":0,"projectID":1}).sort({"projectID":-1}).toArray(function (err, docs) {
		          //display only the value
		 if(err) throw err;
		 
	        
		var pid = docs[0].projectID;
		var firstChar = pid.charAt(0);
	   pid = parseInt(pid.substring(1));
		pid = pid + 1;
        pid = firstChar + pid;
			console.log(pid);	
			var doc  = {};
		      doc.projectID =pid;
		     
		 if (firstChar=="w"){
		 	 doc.type="Waterfall";
		 }
		 else if (firstChar=="s"){
		 	doc.type="Scrum";
		 }
		 else if (firstChar=="k"){
		 	 doc.type="Kanban";
		 }
		 doc.data =[];
		doc.data.push(req.body.dataFields.fieldsArray);
		 console.log("this is the doc"+ JSON.stringify(doc));
	          categories.insert(doc, function(err, result) {
	          	 if(err) throw err;
	          	 
	          	 users.update({'email':req.body.username}, { $push: { 'proj_id': pid } },function(err, docs){
	          	 	
	          	 	if (err) throw err;
	          	 	
	          	 	console.log("added project id " + docs);
	          	 	
	          	 });
	          	 res.send(result);
          
      }); 
	          });         
     
   });
 
}

var upsertProjectDetails = function(req,res){
	var projectID = req.param("projectID");
	var data= req.param("data");
	console.log(req.param("projectID"));
	console.log("inside upsert project details"+ req.body);
	mongodb.MongoClient.connect(uri, function(err, db) {
		 var userData = db.collection('userdata');
	userData.update({"projectID":projectID},{$push:{"data":data}},function(err, docs){
	          	 	
	          	 	if (err) throw err;
	          	 	console.log(docs);
	          	 	console.log("added tasks " + docs);
	          	 	
	          	 });
	
});
}
exports.getProjectsDetails=getProjectsDetails;	
exports.projectsGET = projectsGET;
exports.deleteProjectsDetails=deleteProjectsDetails;
exports.updateProjectDetails=updateProjectDetails;
exports.createProjectsDetails=createProjectsDetails;
exports.createProject=createProject;
exports.upsertProjectDetails= upsertProjectDetails;