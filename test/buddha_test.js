var assert = require('assert'),
    buddha = require('../lib/buddha.js'),
    https = require('https'),
    sinon = require('sinon'),
    vows = require('vows');

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
    },
    'after setting the credentials': {
      topic: function(credentials) {
        return buddha.setCredentials(credentials.host, credentials.email, credentials.password);
      },
      'and calling getEntities when request fails': {
        topic: function(b) {
          var request = {
           on: function(e, c) {
            this.c = c;
           },
           end: function(){
             this.c({ message: 'ERROR'});
           }
          };

          var stubRequest = sinon.stub(https, 'request');
          stubRequest.returns(request);
          b.getEntities('thing', this.callback);
        },
        'should have expected options': function(error, data) {
          var options = https.request.args[0][0];
          assert.notEqual(options, null);
          assert.equal(options.host, 'thehost');
          assert.equal(options.port, 443);
          assert.equal(options.auth, 'a@a.a:PASSWORD');
          assert.equal(options.path, '/things.json');
          assert.equal(options.method, 'GET');
        },
        'should error': function(error, data) {
          assert.equal(error, 'ERROR');
        },
        'should not return data': function(error, data) {
          assert.equal(data, null);
        },
        teardown: function() {
          buddha.resetCredentials();
          https.request.restore();
        }
      }
    }
  }
}).export(module);