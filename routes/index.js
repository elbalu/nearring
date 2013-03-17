/* 
	GET home page */

	exports.loggedin = function(req,res){
		req.model = {
                viewName: 'home',
                master: 'public/templates/base',
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
       res.render(req.model.master, req.model);
	}