var express = require('express')
  , http = require('http')
  , path = require('path')
  , engines = require('consolidate')
  , less = require('less')
  , fs = require('fs')
  , dust = require('dustjs-linkedin')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

require('dustjs-helpers');
var User = require('./mvc/model/user.js');
var config = require('./config'),
routes = require('./routes/index');

//setting up four-square
var venueModel={};
var userLoc='';
   



//setting for passport

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findOne(id, function(err, user){
    done(err,user);
  });
})


if(process.env.VCAP_SERVICES){
  var fbClientId = config.production.fb.appId,
      fbClientSecret = config.production.fb.appSecret,
      fbCallBackUrl = config.production.fb.url + 'fbauthed';
}else{
   var fbClientId = config.development.fb.appId,
      fbClientSecret = config.development.fb.appSecret,
      fbCallBackUrl = config.development.fb.url + 'fbauthed';
}
/*local */

passport.use(new FacebookStrategy({

  clientID: fbClientId,
  clientSecret: fbClientSecret,
  callbackURL: fbCallBackUrl,
  profileFields: ['id', 'displayName', 'location']
},


function(req, accessToken, refreshToken, profile, done){
    // console.log('--------profile--------');
    // console.log(profile);
    // console.log('--------profile--- location -----');
    // console.log(profile._json.location.name);
  process.nextTick(function(){

    var query = User.findOne({'fbId': profile.id});
    query.exec(function(err, oldUser){

      if(oldUser){
        console.log('Existing User: '+ oldUser.name + ' found and logged in!');
        done(null, oldUser);
      } else { 
          var newUser = new User();
          newUser.fbId = profile.id;
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value,
          newUser.username = profile.username,
          newUser.location = profile._json.location.name,
          newUser.accessToken = accessToken;

          newUser.save(function(err){
            if(err) throw err;
            console.log('New User: '+ newUser.name+' created and logged in!');
            console.log(newUser);
            done(null, newUser);
          });
      }

     
    })
  });
}
));

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
  app.use(express.session({ secret: 'foo bar' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, '/public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
   
if(req.session.user){
     userLoc = req.session.user.location;
     userLoc=userLoc.split(',');
     userLoc=userLoc[0];

     console.log('userLoc-----inside index-----');
     console.log(userLoc);
    }


        var session = req.session;
       
        req.model = {
                viewName: 'index',
                master: 'public/templates/master',
                data: {
                    session:session,
                    user: session.user,
                    venues: session.venues,
                    title: 'home page'
       }
         };
          
        res.render(req.model.master, req.model);

    });


          console.log('userLoc length');
          console.log(userLoc.length);
                      if(userLoc.length>0){
             (function() {
              var foursquare, params;
              require('coffee-script');

               if(process.env.VCAP_SERVICES){
                  var foursquare = (require('./node_modules/foursquarevenues'))(config.production.fs.appId, config.production.fs.appSecret); 
                }else{
                  var foursquare = (require('./node_modules/foursquarevenues'))(config.development.fs.appId, config.development.fs.appSecret); 
                 }
                 console.log
              params = {  
                    //"ll": "37.4093788,-121.8855987"  
                    "near": userLoc,
                    "limit": 100
                };
              foursquare.getVenues(params, function(errorType, venues) {
                if (!errorType) {
                    var venRes = venues.response;
                   venueModel={
                    data:venRes
                   };
                 }else{
                  model=errorType;
                 }
              });
             }).call(this);
            }
       


app.get('/getPlaces', function(req, res){
  // console.log('------venue model-----');
  //  console.log(venueModel);
  //   console.log('--------req.session.user-----------');
  //  console.log(req.session.user);
   if(req.session.user){
        console.log('------venue model-----');
   console.log(venueModel);

      res.send(venueModel);
    }
 
  // var model={
  //   data:'1234'
  // }
  // res.send(model);
});

app.get('/fbauth', passport.authenticate('facebook', { scope: ['email', 'user_location']}));

app.get('/fbauthed', passport.authenticate('facebook', {failureRedirect: '/'}), routes.loggedin);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

fs.readdir('./mvc/controller', function(err, files){
    files.forEach(function(fn) {
        if(!/\.js$/.test(fn)) return;
        require('./mvc/controller/' + fn)(app);
    });
});















