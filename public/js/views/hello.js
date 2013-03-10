define([
	'jquery', 
	'underscore', 
	'backbone',
	'../jsdust/hello'
	], 
	function($, _, Backbone){
	
		var View = Backbone.View.extend({
		
			el: '#hello',
		
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