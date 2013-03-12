
/**
 * Module dependencies.
 */
    if(process.env.VCAP_SERVICES){
      var env = JSON.parse(process.env.VCAP_SERVICES);
      var mongo = env['mongodb-1.8'][0]['credentials'];
    }
    else{
    var mongo = {
        "hostname":"localhost",
        "port":27017,
        "username":"",
        "password":"",
        "name":"",
        "db":"db"
      }
    }
    var generate_mongo_url = function(obj){
      obj.hostname = (obj.hostname || 'localhost');
      obj.port = (obj.port || 27017);
      obj.db = (obj.db || 'test');
      if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
      }
      else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
      }
    }
    var mongourl = generate_mongo_url(mongo);

    
var express = require('express')
  , http = require('http')
  , path = require('path')
  , engines = require('consolidate')
  , less = require('less')
  , fs = require('fs')
  , dust = require('dustjs-linkedin');

require('dustjs-helpers');

var app = express();
app.engine('dust', engines.dust);

app.configure(function(){
  app.set('port', process.env.VCAP_APP_PORT || 3000);
  app.set('views', __dirname + '/');
  app.set('view engine', 'dust');
  app.set('template_engine', dust);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

fs.readdir('./mvc/controller', function(err, files){
    files.forEach(function(fn) {
        if(!/\.js$/.test(fn)) return;
        require('./mvc/controller/' + fn)(app);
    });
});