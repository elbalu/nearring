
/*
 * GET home page.
 */
module.exports = function(app) {
	app.get('/', function(req, res){
        var User = require('../model/user.js');
       var user = new User();
        user.firstname = 'balu';
        user.lastname = 'loganathan';
        user.email = 'elbalu@gmail.com';
        user.save(function(error, user){
            console.log('inside save funtion');
          if(error){
            console.log('mongodb error -----');
            console.log(error);
          }else{
            console.log('----user saved--'+ user);
          }
        });
        var session = req.session;

        req.model = {
                viewName: 'index',
                master: 'public/templates/master',
                data: {
                    session:session,
                    title: 'home page'
			 }
         };
       res.render(req.model.master, req.model);

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
    //  app.post('/signup', function(req, res){
    //     var session = req.session;

    //     req.model = {
    //             viewName: 'signup/validateSignup',
    //             master: 'public/templates/master',
    //             data: {
    //                 session:session,
    //                 title: 'home page',
    //                 registerEmail: req.body.registerEmail 
    //          }
    //      };
    //    res.render(req.model.master, req.model);

    // });
    
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



}