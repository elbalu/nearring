/* 
	GET home page */

	exports.loggedin = function(req,res){
		var session = req.session;
		var user =  req.user;
		session.user =  user;
		req.model = {
                viewName: 'index',
                master: 'public/templates/master',
                data: {
                    title: 'lib',
                    rack:[
	                    {
	                    	category:'book',
	                    	avaliable:true,
	                    	name:'the book'

	                    }
	                    ],
	                   user: req.user

                    
                }
         };
         console.log('----req.user-------');
         console.log(req.user);
          console.log('----req.session.user-------');
         console.log(req.session);

       res.render(req.model.master, req.model);
	}