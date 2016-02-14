 var express=require("express");
var http=require("http");
var client=require("node-rest-client");
var mongodb=require("mongodb");
//var Connection=require("./Connection");
var user=require("./user");
var loginjs=require("./login");
var projects=require("./projects");
var schemajs=require("./schema");
var base=require("./base");
var bodyParser=require("body-parser");
var url=require("url");
var app=express();




var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
, ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.set('views', __dirname + '/views/');
console.log(app.get('views'));
app.set('view engine', 'ejs');
app.use(express.static(app.get('views')));
app.use(bodyParser());

//app.get('/',Connection.dbConnect);
app.get('/',loginjs.login);
app.post('/login',loginjs.after_login);
app.post('/getschema',schemajs.schemaGET);
app.get('/user',user.user);
//app.get('/getUser',user.userGET);
app.post('/createUser',user.createUser);
app.get('/userHome',user.userHome);
app.post('/getProjects',projects.projectsGET);
app.post('/getProjectDetails',projects.getProjectsDetails);
app.get('/basepage',base.basepage);
app.get('/createProject',projects.createProject);
app.post('/updateProjectDetails',projects.updateProjectDetails);
app.post('/createProjectsDetails',projects.createProjectsDetails);
app.post('/upsertProjectDetails',projects.upsertProjectDetails);
//app.put('/updateUser',user.userPUT);
//app.delete('/deleteUser',user.userDELETE);


http.createServer(app).listen(port,ip, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
