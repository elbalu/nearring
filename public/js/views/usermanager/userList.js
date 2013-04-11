define([
	'jquery', 
	'underscore', 
	'backbone',
	'../../jsdust/index'
	], 
	function($, _, Backbone){
	
		var userList = Backbone.View.extend({
		
			el: $("#userList"),
		
			events: {
			},
			
			initialize: function() {

				console.log('user list');
			},
			
			render: function() {
				this.$el.html('content placed here');
			}
		
		});
		
		return userList;
	
	}
);