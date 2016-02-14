var ejs = require("ejs");
var mongodb=require("mongodb");
var uri = 'mongodb://navjot:cmpe281team14@ds053877.mongolab.com:53877/lab4';

function basepage(req,res){
   var  pid=req.param("projid");
    console.log("base page project id"+req.body);
   // res.render('base.ejs',proj=pid);
    ejs.renderFile('./views/base.ejs',function(err, result) {
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
    
    
};
exports.basepage=basepage;
