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

var config = require('./config'),
routes = require('./routes/index');

//setting for passport

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
  User.findOne(id, function(err, user){
    done(err,user);
  });
})

/*local */

// passport.use(new FacebookStrategy({
//   clientID: config.development.fb.appId,
//   clientSecret: config.development.fb.appSecret,
//   callbackURL: config.development.fb.url + 'fbauthed'
// },

/* production */

passport.use(new FacebookStrategy({
  clientID: config.production.fb.appId,
  clientSecret: config.production.fb.appSecret,
  callbackURL: config.production.fb.url + 'fbauthed'
},


function(accessToken, refreshToken, profile, done){
  console.log('----profile----------');
  console.log(profile);
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
          newUser.username = profile.username;

          newUser.save(function(err){
            if(err) throw err;
            console.log('New User: '+ newUser.name+' created and logged in!');
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

app.get('/fbauth', passport.authenticate('facebook', { scope: 'email'}));

app.get('/fbauthed', passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/'}), routes.loggedin);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

fs.readdir('./mvc/controller', function(err, files){
    files.forEach(function(fn) {
        if(!/\.js$/.test(fn)) return;
        require('./mvc/controller/' + fn)(app);
    });
});















