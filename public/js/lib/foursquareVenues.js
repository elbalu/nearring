// Generated by CoffeeScript 1.4.0
(function() {
  var request;

  require('coffee-script');

  request = require('request');

  module.exports = function(client_id, client_secret) {
    var date, day, month, today;
    today = new Date();
    month = today.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    day = today.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    date = today.getFullYear() + "" + month + "" + day;
    return {
      getVenues: function(params, callback) {
        var urlString;
        urlString = "https://api.foursquare.com/v2/venues/search?";
        if (params.ll != null) {
          urlString += "&ll=" + params.ll;
        }
        if (params.near != null) {
          urlString += "&near=" + params.near;
        }
        if (params.llAcc != null) {
          urlString += "&llAcc=" + params.llAcc;
        }
        if (params.alt != null) {
          urlString += "&alt=" + params.alt;
        }
        if (params.altAcc != null) {
          urlString += "&altAcc=" + params.altAcc;
        }
        if (params.query != null) {
          urlString += "&query=" + params.query;
        }
        if (params.limit != null) {
          urlString += "&limit=" + params.limit;
        }
        if (params.intent != null) {
          urlString += "&intent=" + params.intent;
        }
        if (params.radius != null) {
          urlString += "&radius=" + params.radius;
        }
        if (params.sw != null) {
          urlString += "&sw=" + params.sw;
        }
        if (params.ne != null) {
          urlString += "&ne=" + params.ne;
        }
        if (params.categoryId != null) {
          urlString += "&categoryId=" + params.categoryId;
        }
        if (params.url != null) {
          urlString += "&url=" + params.url;
        }
        if (params.providerId != null) {
          urlString += "&providerId=" + params.prodividerId;
        }
        if (params.linkedId != null) {
          urlString += "&linkedId=" + params.linkedId;
        }
        if (client_id != null) {
          urlString += "&client_id=" + client_id;
        }
        if (client_secret != null) {
          urlString += "&client_secret=" + client_secret;
        }
        urlString += "&v=" + date;
        return request(urlString, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            callback(null, JSON.parse(body));
          }
          if (response.statusCode === 400) {
            callback("400", null);
          }
          if (response.statusCode === 401) {
            callback("401", null);
          }
          if (response.statusCode === 403) {
            callback("403", null);
          }
          if (response.statusCode === 404) {
            callback("404", null);
          }
          if (response.statusCode === 405) {
            callback("405", null);
          }
          if (response.statusCode === 409) {
            callback("409", null);
          }
          if (response.statusCode === 500) {
            return callback("500", null);
          }
        });
      },
      exploreVenues: function(params, callback) {
        var urlString;
        urlString = "https://api.foursquare.com/v2/venues/explore?";
        if (params.ll != null) {
          urlString += "&ll=" + params.ll;
        }
        if (params.near != null) {
          urlString += "&near=" + params.near;
        }
        if (params.llAcc != null) {
          urlString += "&llAcc=" + params.llAcc;
        }
        if (params.alt != null) {
          urlString += "&alt=" + params.alt;
        }
        if (params.altAcc != null) {
          urlString += "&altAcc=" + params.altAcc;
        }
        if (params.query != null) {
          urlString += "&query=" + params.query;
        }
        if (params.limit != null) {
          urlString += "&limit=" + params.limit;
        }
        if (params.section != null) {
          urlString += "&section=" + params.section;
        }
        if (params.radius != null) {
          urlString += "&radius=" + params.radius;
        }
        if (params.novelty != null) {
          urlString += "&novelty=" + params.novelty;
        }
        if (client_id != null) {
          urlString += "&client_id=" + client_id;
        }
        if (client_secret != null) {
          urlString += "&client_secret=" + client_secret;
        }
        urlString += "&v=" + date;
        return request(urlString, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            callback(null, JSON.parse(body));
          }
          if (response.statusCode === 400) {
            callback("400", null);
          }
          if (response.statusCode === 401) {
            callback("401", null);
          }
          if (response.statusCode === 403) {
            callback("403", null);
          }
          if (response.statusCode === 404) {
            callback("404", null);
          }
          if (response.statusCode === 405) {
            callback("405", null);
          }
          if (response.statusCode === 409) {
            callback("409", null);
          }
          if (response.statusCode === 500) {
            return callback("500", null);
          }
        });
      },
      getVenue: function(params, callback) {
        var urlString;
        urlString = "https://api.foursquare.com/v2/venues/";
        urlString += params.venue_id;
        urlString += "?v=" + date;
        if (client_id != null) {
          urlString += "&client_id=" + client_id;
        }
        if (client_secret != null) {
          urlString += "&client_secret=" + client_secret;
        }
        urlString += "&v=" + date;
        return request(urlString, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            callback(null, JSON.parse(body));
          }
          if (response.statusCode === 400) {
            callback("400", null);
          }
          if (response.statusCode === 401) {
            callback("401", null);
          }
          if (response.statusCode === 403) {
            callback("403", null);
          }
          if (response.statusCode === 404) {
            callback("404", null);
          }
          if (response.statusCode === 405) {
            callback("405", null);
          }
          if (response.statusCode === 409) {
            callback("409", null);
          }
          if (response.statusCode === 500) {
            return callback("500", null);
          }
        });
      }
    };
  };

}).call(this);
