require.config({
  paths: {
    jquery: 'lib/jquery-min',
    underscore: 'lib/underscore-min',
    backbone: 'lib/backbone-optamd3-min',
    json: (typeof JSON === "undefined") ? "lib/json2" : "empty:",
    dust: 'lib/dust-core-1.0.0',
    bootstrap:'lib/bootstrap',
    less:'lib/less-1.3.0.min',
    select2: 'lib/select2'
  },

  shim: {
  
    
    "backbone": {
      deps: ["underscore", "jquery"]
    },
    "bootstrap":{
      deps:["jquery"]
    },
    "select2": {
      deps: ["jquery"]
    }
  }
});

require(['views/app'], function(AppView){
  var app_view = new AppView;
  app_view.render();
});

