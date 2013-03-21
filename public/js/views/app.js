define([
  'jquery',
  'underscore', 
  'backbone',
  'bootstrap',
  'dust',
  'select2'
  ], function($, _, Backbone,Bootstrap, Dust){
  var AppView = Backbone.View.extend({

    el: $("#content"),

    events: {
			'submit form.proceed': 'proceedForm',
	    	'click a.proceed': 'proceedInnerLink'
	 },

    initialize: function() {
      if (localStorage) {
        if(localStorage.getItem('visit')){
          var key=localStorage.getItem('visit');
          key++;
          // if(key>3){
          //   $('#signupBanner').hide();
          // }
          localStorage.setItem('visit',key);
         }else{
          localStorage.setItem('visit',0);
        }

      }


    $("#e7").select2({
      placeholder: "Work / Study location",
      minimumInputLength: 1,
      ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
        url: "https://graph.facebook.com/search",
        dataType: 'jsonp',
        data: function (term, page) {
          return {
            q: term, // search term
            limit: 10,
            type: 'place',
            access_token:'AAAFrRxc9yhMBAIlm2VV64ZAEq9qGUp60JnAEl8q435thHCiunvD8hCwRXVAN0jJlKQqPa2M4ZBLl08YRXC8ozHcmTWxt7aKl9csMT10wZDZD'
            //apikey: "ju6z9mjyajq2djue3gbvv26t" // please do not use so this example keeps working
          };
        },
        results: function (data, page) { // parse the results into the format expected by Select2.
        // since we are using custom formatting functions we do not need to alter remote JSON data
        console.log(data.data);
        return {results: data.data};
        }
      },
      // initSelection: function(element, callback) {
      // // the input tag has a value attribute preloaded that points to a preselected movie's id
      // // this function resolves that id attribute to an object that select2 can render
      // // using its formatResult renderer - that way the movie name is shown preselected
      //   var id=$(element).val();
      //   if (id!=="") {
      //     $.ajax("https://graph.facebook.com/search?q=the%20crossing&type=place&access_token=AAAFrRxc9yhMBAIlm2VV64ZAEq9qGUp60JnAEl8q435thHCiunvD8hCwRXVAN0jJlKQqPa2M4ZBLl08YRXC8ozHcmTWxt7aKl9csMT10wZDZD&limit=25&offset=25&__after_id=180765575381446", {
      //       data: {
      //         access_token:'AAAFrRxc9yhMBAIlm2VV64ZAEq9qGUp60JnAEl8q435thHCiunvD8hCwRXVAN0jJlKQqPa2M4ZBLl08YRXC8ozHcmTWxt7aKl9csMT10wZDZD&limit'
      //       },
      //       dataType: "jsonp"
      //     }).done(function(data) { callback(data); });
      //   }
      // },
      formatResult: movieFormatResult, // omitted for brevity, see the source of this page
      formatSelection: movieFormatSelection, // omitted for brevity, see the source of this page
      dropdownCssClass: "bigdrop" // apply css that makes the dropdown taller
      //escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    });


   function movieFormatResult(data) {
    console.log('data forated');
    console.log(data);
        var markup = "<table class='movie-result'><tr>";
        console.log(data.name);
        if (data.name !== undefined && data.name !== undefined) {
            markup += "<td class='movie-image'>" + data.name + "</td>";
        }
        markup += "<td class='movie-info'><div class='movie-title'>" + data.name + "</div>";
      
        markup += "</td></tr></table>"
        return markup;
    }

    function movieFormatSelection(movie) {
        return data.name;
    }
    	
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
