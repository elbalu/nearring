
/*
 * GET home page.
 */
module.exports = function(app) {
	
  



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



}