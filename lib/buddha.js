var https = require('https');

var buddha = {};

buddha.setCredentials = function(host, email, password) {
  this.host = host;
  this.email = email;
  this.password = password;
};

buddha.resetCredentials = function() {
  this.host = null;
  this.email = null;
  this.password = null;
};

buddha.setOnBehalfOf = function(email) {
  this.onBehalfOf = email;
};

buddha.getUsers = function(callback) {
  var options = {
    host: this.host,
    port: 443,
    auth: this.email + ':' + this.password,
    path: "/users.json",
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
    res.on('close', function() {
      return callback(null);
    });
  });

  req.on('error', function(e) {
    return callback(e.message);
  });

  req.end();
};

module.exports = buddha;