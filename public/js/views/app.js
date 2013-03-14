define([
  'jquery',
  'underscore', 
  'backbone',
  'bootstrap',
  'dust'
  ], function($, _, Backbone,Bootstrap, Dust){
  var AppView = Backbone.View.extend({

    el: $("#content"),

    events: {
			'submit form.proceed': 'proceedForm',
	    	'click a.proceed': 'proceedInnerLink'
	 },

    initialize: function() {

    	
    },

    render: function() {

    },
    
    proceedForm: function(e) {
    	// var $target = this.$(e.target),
    	// href = $target.attr("action");
    	// console.log(href);
    	// $.ajax({
    	// 	url : href,
    	// 	type : "POST",
    	// 	data : $target.serialize(),
    	// 	success : function(data){
    	// 		console.log(data)
    	// 	}
    	// });
		$.post(e.target.action,	function(json){
			require(['views/' + json.viewName], function(View){
		    	var pageView = new View(json);
				dust.render(json.viewName, json, function(err, out) {
					$('#innerContent').html(out);
				});
		    	pageView.render(json);
		    });    
		});

  		e.preventDefault();
    },
     proceedFormUserSet: function(e) {
    	
		$.post(e.target.action,	function(json){
		    require(['views/' + json.viewName], function(View){

		    	var pageView = new View(json);
				dust.render('public/templates/' + json.viewName + '.dust', json, function(err, out) {
					$('#userSet').empty();
					document.getElementById("userSet").innerHTML = out;
				});
		    	pageView.render(json);
		    });    
		});

	    e.preventDefault();
    },

    proceedInnerLink: function(e) {
    	$.get(e.target.href,	function(json){
			require(['views/' + json.viewName], function(View){
		    	var pageView = new View(json);
				dust.render(json.viewName, json, function(err, out) {
					$('#innerContent').html(out);
				});
		    	pageView.render(json);
		    });    
		});

	    e.preventDefault();
    }
    

  });
  
  return AppView;
  
});
