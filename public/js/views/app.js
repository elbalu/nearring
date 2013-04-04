define([
  'jquery',
  'underscore', 
  'backbone',
  'bootstrap',
  'dust',
  'select2'
  ], function($, _, Backbone,Bootstrap, Dust, select2){
  

  // var MyModel = Backbone.Model.extend();
  //   var MyCollection = Backbone.Collection.extend({
  //       url: '/getPlaces',
  //       model: MyModel
  //   });
  //   var coll = new MyCollection();
  //   coll.fetch({
  //       error: function (collection, response) {
  //           console.log('error', response);
  //       },
  //       success: function (collection, response) {
  //           console.log('success', response);
  //       }
  //   });

  var AppView = Backbone.View.extend({

    el: $("#content"),
    events: {
			'submit form.proceed': 'proceedForm',
	    	'click a.proceed': 'proceedInnerLink'
	 },

    initialize: function() {
      //  navigator.geolocation.getCurrentPosition(function(data) {
      //   var lat = data['coords']['latitude'];
      //   var lng = data['coords']['longitude'];
      //   console.log(lat);
      // console.log(lng);
      //   });
  
    $.ajax({
       url : '/getPlaces',
       type : "GET",
       success : function(data){
         console.log(data);
       }
      });


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
            limit: 20,
            type: 'place',
            //distance:10000,
            access_token:'AAAFrRxc9yhMBAIlm2VV64ZAEq9qGUp60JnAEl8q435thHCiunvD8hCwRXVAN0jJlKQqPa2M4ZBLl08YRXC8ozHcmTWxt7aKl9csMT10wZDZD'
            //apikey: "ju6z9mjyajq2djue3gbvv26t" // please do not use so this example keeps working
          };
        },
        results: function (data, page) { // parse the results into the format expected by Select2.
         var more = (page * 10) < data.total; // whether or not there are more results available
          // notice we return the value of more so Select2 knows if more results can be loaded
          return {results: data.data, more: more};
        }
      },
      formatResult: movieFormatResult, // omitted for brevity, see the source of this page
      formatSelection: movieFormatSelection, // omitted for brevity, see the source of this page
      dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
      escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    });

    $("#e8").select2({
      placeholder: "living Apt name",
      minimumInputLength: 1,
      ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
        url: "https://graph.facebook.com/search",
        dataType: 'jsonp',
        data: function (term, page) {
          return {
            q: term, // search term
            limit: 20,
            type: 'place',
            //distance:10000,
            access_token:'AAAFrRxc9yhMBAIlm2VV64ZAEq9qGUp60JnAEl8q435thHCiunvD8hCwRXVAN0jJlKQqPa2M4ZBLl08YRXC8ozHcmTWxt7aKl9csMT10wZDZD'
            //apikey: "ju6z9mjyajq2djue3gbvv26t" // please do not use so this example keeps working
          };
        },
        results: function (data, page) { // parse the results into the format expected by Select2.
         var more = (page * 10) < data.total; // whether or not there are more results available
          // notice we return the value of more so Select2 knows if more results can be loaded
          return {results: data.data, more: more};
        }
      },
      formatResult: movieFormatResult, // omitted for brevity, see the source of this page
      formatSelection: movieFormatSelection, // omitted for brevity, see the source of this page
      dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
      escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
    });

   function movieFormatResult(data) {
    console.log('data forated');
    console.log(data);
        var markup = "<table class='movie-result'><tr>";
        console.log(data.name);
        if (data.name !== undefined && data.name !== undefined) {
            markup += "<td><img class='place-image' src='https://graph.facebook.com/"+data.id+"/picture?type=small'/></td><td class='place-name'>" + data.name + "<p>"+data.location.city+" , "+data.location.state+" , "+data.location.country+"</p></td>";
        }
      
        markup += "</td></tr></table>"
        return markup;
    }

    function movieFormatSelection(data) {
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
