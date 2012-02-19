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
  return callback(null);
};

module.exports = buddha;