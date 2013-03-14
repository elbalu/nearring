define([
	'jquery', 
	'underscore', 
	'backbone',
	'../jsdust/validateSignup'
	], 
	function($, _, Backbone){
	
		var View = Backbone.View.extend({
		
			el: '#validateSignup',
		
			events: {
			},
			
			initialize: function(json) {
			},
			
			render: function(json) {
			}
		
		});
		
		return View;
	
	}
);