
/*
 * GET home page.
 */
module.exports = function(app) {
	
  
var User = require('../model/user.js');


    app.get('/logout', function(req, res){
         var session = req.session,
            user = session.user;
          req.logOut();
          delete session.user;
          res.redirect('/');
        });


        function processHello(req,res){
         var session = req.session;

        return({
        viewName: "hello",
        baseTemplate: 'master',
        data: {
            title: 'hello Sai'
        }

        });
    }


     app.get('/app', function(req, res){
        var json = processHello(req,res);
            if(req.header('X-Requested-With') == 'XMLHttpRequest') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(json));
                res.end();
            }
            else {
                res.render("public/templates/" + json.baseTemplate,json);
            }



    });
    
      function processSignup(req,res){
         var session = req.session;

        return({
        viewName: "validateSignup",
        baseTemplate: 'master',
        data: {
            title: 'hello Sai',
            registerEmail: req.body
        }

        });
    }


     app.post('/signup', function(req, res){

        var json = processSignup(req,res);
            if(req.header('X-Requested-With') == 'XMLHttpRequest') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(json));
                res.end();
            }
            else {
                res.render("public/templates/" + json.baseTemplate,json);
            }
    });

    function processPersonalProfile(req,res){
         var session = req.session;
         
         
         User.findOne({'fbId':req.body.id}, function(err, user){
            console.log('user  _id ');
            console.log(user._id);
            var id=user._id;
            var updateObject={
            emailId: req.body.personalEmail,
            phone: req.body.personalPhone,
            personalProfie: true
         };
         User.findOne(id, updateObject, function(err, user){
            if(err){ console.log('updating user error'+ err);
           // throw err;
        }else{
                console.log('user updated');
                console.log(user);
            }

         });
          });
        return({
        viewName: "validateSignup",
        baseTemplate: 'master',
        data: {
            title: 'hello Sai',
            registerEmail: req.body
        }

        });
    }


     app.post('/personalProfile', function(req, res){

        var json = processPersonalProfile(req,res);
            if(req.header('X-Requested-With') == 'XMLHttpRequest') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(json));
                res.end();
            }
            else {
                res.render("public/templates/" + json.baseTemplate,json);
            }
    });




}