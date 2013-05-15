define([
        'jquery',
        'underscore',
        'backbone',
        'bootstrap',
        'dust',
        'dustHelper',
        'select2',
        'views/usermanager/userList',
        'views/hello',
        '../jsdust/hello',
        '../jsdust/aboutNR',
        '../jsdust/message'
], function ($, _, Backbone, Bootstrap, Dust, select2) {


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
   var livingData, workingData;

    var AppView = Backbone.View.extend({

        el: $("#content"),
        events: {
            'submit form#form-personal-profile': 'personalProfile',
            'submit form#form-create-groups': 'createGroups',
            'click a.proceed': 'proceedInnerLink'
        },

        initialize: function () {
            //  navigator.geolocation.getCurrentPosition(function(data) {
            //   var lat = data['coords']['latitude'];
            //   var lng = data['coords']['longitude'];
            //   console.log(lat);
            // console.log(lng);
            //   });

         


            if (localStorage) {
                if (localStorage.getItem('visit')) {
                    var key = localStorage.getItem('visit');
                    key++;
                    // if(key>3){
                    //   $('#signupBanner').hide();
                    // }
                    localStorage.setItem('visit', key);
                } else {
                    localStorage.setItem('visit', 0);
                }

            }
            var nearby;
            if ($('#signup-user-location').length>0) {
                nearby = $('#signup-user-location').val().split(',')[0];
            }
            
            $("#e7").select2({
                placeholder: "Work / Study location",
                minimumInputLength: 4,
                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                    url: "https://api.foursquare.com/v2/venues/search",
                    dataType: 'jsonp',
                    data: function (term, page) {
                        return {
                            query: term, // search term
                            limit: 50,
                            radius: 10000,
                            near: nearby,
                            client_id: 'R0D4KSE2PXCGISCIX02CPYJT553AQT2R2IYPLWMKSLF4GHJT',
                            client_secret: 'IGJKGSCSDIFLXKWMMGNJPFR3VC2MI5POP2NL5CGKMWHO5XIQ'
                        };
                    },
                    results: function (data, page) { // parse the results into the format expected by Select2.
                        data = data.response.groups[0].items;
                        var more = (page * 10) < data.total; // whether or not there are more results available
                        // notice we return the value of more so Select2 knows if more results can be loaded
                        return {
                            results: data,
                            more: more
                        };
                    }
                },
                formatResult: venuesFormatResult, // omitted for brevity, see the source of this page
                formatSelection: venuesFormatSelection, // omitted for brevity, see the source of this page
                dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
                escapeMarkup: function (m) {
                    return m;
                } // we do not want to escape markup since we are displaying html in results
            });

            $("#e8").select2({
                placeholder: "Living location",
                minimumInputLength: 4,
                ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
                    url: "https://api.foursquare.com/v2/venues/search",
                    dataType: 'jsonp',
                    data: function (term, page) {
                        return {
                            query: term, // search term
                            limit: 50,
                            radius: 10000,
                            near: nearby,
                            client_id: 'R0D4KSE2PXCGISCIX02CPYJT553AQT2R2IYPLWMKSLF4GHJT',
                            client_secret: 'IGJKGSCSDIFLXKWMMGNJPFR3VC2MI5POP2NL5CGKMWHO5XIQ'
                        };
                    },
                    results: function (data, page) { // parse the results into the format expected by Select2.
                        data = data.response.groups[0].items;
                        var more = (page * 10) < data.total; // whether or not there are more results available
                        // notice we return the value of more so Select2 knows if more results can be loaded
                        return {
                            results: data,
                            more: more
                        };
                    }
                },
                formatResult: livingFormatResult, // omitted for brevity, see the source of this page
                formatSelection: livingFormatSelection, // omitted for brevity, see the source of this page
                dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
                escapeMarkup: function (m) {
                    return m;
                } // we do not want to escape markup since we are displaying html in results
            });

            function venuesFormatResult(data) {
                var markup = "<table class='venues-result'><tr>";
                //console.log(data);
                if (data.name !== undefined && data.name !== undefined) {
                    markup += "<td class='place-icon'><img src='" + data.categories[0].icon + "'/></td><td class='place-name'>" + data.name + "<p>" + data.location.city + " , " + data.location.state + " , " + data.location.country + "</p></td>";
                }

                markup += "</td></tr></table>"
                return markup;
            }

            function venuesFormatSelection(data) {
                
                workingData = {
                    guid: data.id,
                    group_name:data.name,
                    location: data.location,
                    group_owner_id:$('#userFBId').val()
                }
                return data.name;
            }
             function livingFormatResult(data) {
                var markup = "<table class='venues-result'><tr>";
                //console.log(data);
                if (data.name !== undefined && data.name !== undefined) {
                    markup += "<td class='place-icon'><img src='" + data.categories[0].icon + "'/></td><td class='place-name'>" + data.name + "<p>" + data.location.city + " , " + data.location.state + " , " + data.location.country + "</p></td>";
                }

                markup += "</td></tr></table>"
                return markup;
            }

            function livingFormatSelection(data) {
                livingData = {
                    guid: data.id,
                    group_name:data.name,
                    location: data.location,
                    group_owner_id:$('#userFBId').val()
                }
                return data.name;
            }

        },

        render: function () {

        },

        personalProfile: function (e) {
            var $target = this.$(e.target),
                href = $target.attr("action");
                var that = this;
            $.ajax({
                url: href,
                type: "POST",
                data: $target.serialize(),
                success: function (data) {
                    console.log(data.data);
                        $('#div-signup-profile .alert-').show();
                             require(['views/' + data.data.viewName], function (View) {

                              var pageView = new View(data.data);
                              dust.render(data.data.viewName, data, function (err, out) {
                                console.log('---err----');
                                console.log(err);
                                console.log('---out----');
                                console.log(out);
                                $('#signupBanner').html(out);
                                that.initialize();
                              });
                              pageView.render(data);
                          });
                }
            });
             e.preventDefault();
        },

        createGroups: function (e) {
            this.initialize();
            var $target = this.$(e.target),
                href = $target.attr("action");

            var sendData = {
                FBId:$('#userFBId').val(),
                workGroup:workingData,
                liveGroup:livingData

            }
            $.ajax({
                url: href,
                type: "POST",
                data: sendData,
                success: function (data) {
                    console.log(data);
                  $('#div-signup-group .alert-success').show();
                        var dataObj=data.data;
                             require(['views/' + data.data.viewName], function (View) {

                              var pageView = new View(data.data);
                              dust.render(data.data.viewName, data, function (err, out) {
                                $('#signupBanner').html(out);
                              });
                              pageView.render(data.data);
                          });
                   
                }
            });
             e.preventDefault();
        },


        proceedFormUserSet: function (e) {

            $.post(e.target.action, function (json) {
                require(['views/' + json.viewName], function (View) {

                    var pageView = new View(json);
                    dust.render('public/templates/' + json.viewName + '.dust', json, function (err, out) {
                        $('#userSet').empty();
                        document.getElementById("userSet").innerHTML = out;
                    });
                    pageView.render(json);
                });
            });

            e.preventDefault();
        },

        proceedInnerLink: function (e) {
            $.get(e.target.href, function (json) {
                require(['views/' + json.viewName], function (View) {
                    var pageView = new View(json);
                    dust.render(json.viewName, json, function (err, out) {
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