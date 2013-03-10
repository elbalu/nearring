
/*
 * GET home page.
 */
module.exports = function(app) {
	app.get('/', function(req, res){
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
}