var https = require('https');

var buddha = {};

buddha.setCredentials = function(host, email, password) {
  this.host = host;
  this.email = email;
  this.password = password;
  return this;
};

buddha.resetCredentials = function() {
  this.host = null;
  this.email = null;
  this.password = null;
  return this;
};

buddha.setOnBehalfOf = function(email) {
  this.onBehalfOf = email;
  return this;
};

buddha.getEntities = function(path, callback) {
  var options = {
    host: this.host,
    port: 443,
    auth: this.email + ':' + this.password,
    path: path,
    method: 'GET'
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf8');

    var body = '';

    var closeOrEnd = function(){
      var data = JSON.parse(body);
      return callback(null, data);
    };

    res.on('data', function (chunk) {
      body += chunk;
    });
    res.on('close', function () {
      closeOrEnd(); 
    });
    res.on('end', function() {
      closeOrEnd(); 
    });
  });

  req.on('error', function(e) {
    return callback(e.message);
  });

  req.end();
};

buddha.getUsers = function(callback) {
  return buddha.getEntities('/users.json', callback);
};

buddha.getTickets = function(view, page, callback) {
  return buddha.getEntities('/rules/' + view + '.json?page=' + page, callback);
};

buddha.getTicketCount = function(view, callback) {
  var total = 0;
  var getAllCounts = function(page) {
    buddha.getTickets(view, page, function(err, result) {
      if(err) {
        return callback(err, null);
      }

      var count = result.length;
      if(count === undefined) {
        return callback(null, total);
      }
      
      total += count;
      getAllCounts(page + 1);
    });      
  }; 
  
  getAllCounts(1);
};

module.exports = buddha;
