var buddha = {
};

buddha.setCredentials = function(email, password) {
    this.email = email;
    this.password = password;
};

buddha.setOnBehalfOf = function(email) {
    this.onBehalfOf = email;
};

module.exports = buddha;