var vows = require('vows'),
    assert = require('assert'),
    buddha = require('../lib/buddha.js');

vows.describe('buddha').addBatch({
  'with valid credentials': {
    topic: {
      host: "thehost",
      email: "a@a.a",
      password: "PASSWORD"
    },
    'calling setCredentials': {
      topic: function(credentials) {
        return buddha.setCredentials(credentials.host, credentials.email, credentials.password);
      },
      'should set host': function(b) {
        assert.equal(b.host, "thehost");
      },
      'should set email': function(b) {
        assert.equal(b.email, "a@a.a");
      },
      'should set password': function(b) {
        assert.equal(b.password, "PASSWORD");
      },
      teardown: function(b) {
        b.resetCredentials();
      }
    },
    'calling setOnBehalfOf': {
      topic: function(credentials) {
        return buddha.setOnBehalfOf(credentials.email);
      },
      'should set onBehalfOf': function(b) {
        assert.equal(b.onBehalfOf, "a@a.a");
      },
      teardown: function(b) {
        b.setOnBehalfOf(null);
      }
    }
    /*
    'after setting the credentials': {
      topic: function(credentials) {
        buddha.setCredentials(credentials.host, credentials.email, credentials.password);
        return buddha;
      },
      'and calling getUsers': {
        topic: function(b) {
          b.getUsers(this.callback);
        },
        'should not error': function(error, data) {
          assert.isNull(error);
        },
        teardown: function(b) {
          b.resetCredentials();
        }
      }
    }
    */
  }
}).export(module);