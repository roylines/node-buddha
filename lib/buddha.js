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
    auth: this.email + ':' + this.password,
    path: 'users.json'
  };
  return callback(null);
/*
  var get = https.get(options ,function(res) {
    console.log(res);
    return callback(null);
  });

  get.on('error', function(e) {
    return callback(e);
  });
*/
};

module.exports = buddha;