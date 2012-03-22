var assert = require('assert'),
    buddha = require('../lib/buddha.js'),
    https = require('https'),
    sinon = require('sinon'),
    vows = require('vows');

var checkOptions = function(options){
  assert.notEqual(options, null);
  assert.equal(options.host, 'thehost');
  assert.equal(options.port, 443);
  assert.equal(options.auth, 'a@a.a:PASSWORD');
  assert.equal(options.path, '/dir/thing.json&p=1');
  assert.equal(options.method, 'GET');
};

vows.describe('buddha')
.addBatch({
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
        sinon.stub(https, 'request');
        return buddha.setCredentials(credentials.host, credentials.email, credentials.password);
      },
      'and calling getEntities when request fails': {
        topic: function(b) {
          https.request.reset();
          var request = {
           on: function(e, c) {
            this.c = c;
           },
           end: function(){
             this.c({ message: 'ERROR'});
           }
          };

          https.request.returns(request);
          b.getEntities('/dir/thing.json&p=1', this.callback);
        },
        'should have expected options': function(error, data) {
          var options = https.request.args[0][0];
          checkOptions(options);
        },
        'should error': function(error, data) {
          assert.equal(error, 'ERROR');
        },
        'should not return data': function(error, data) {
          assert.equal(data, null);
        }
      },
      'and calling getEntities when request returns 2 data parts': {
        topic: function(b) {
          https.request.reset();
          var res = {};
          res.setEncoding = function() {};
          res.on = function(e, c) {
            if(e === 'data') {
              this.ondata = c;
            }
            if(e === 'close') {
              this.ondata('{ "firstpart": "1", ');
              this.ondata('  "secondpart": "2" }');
              c();
            }
          };
          var request = {
           on: function() {},
           end: function() {
             https.request.yield(res);
           }
          };

          https.request.returns(request);
          b.getEntities('/dir/thing.json&p=1', this.callback);
        },
        'should have expected options': function(error, data) {
          var options = https.request.args[0][0];
          checkOptions(options);
        },
        'should not error': function(error, data) {
          assert.equal(error, null);
        },
        'should return expected data': function(error, data) {
          assert.notEqual(data, null);
          assert.equal(JSON.stringify(data), JSON.stringify({ firstpart: '1', secondpart: '2'}));
        }
      },
      teardown: function() {
        https.request.restore();
        buddha.resetCredentials();
      }
    }
  }
})
.addBatch({
  'calling getUsers': {
    topic: function() {
      sinon.stub(buddha, 'getEntities').yields('ERR', 'DATA');
      buddha.getUsers(this.callback);
    },
    'should have expected error': function(err, result) {
      assert.equal(err, 'ERR');
    },
    'should have expected result': function(err, result) {
      assert.equal(result, 'DATA');
    },
    'should call getEntities with correct path': function(err, result) {
      assert.ok(buddha.getEntities.calledWith('/users.json'));
    },
    teardown: function() {
      buddha.getEntities.restore();
    }
  }
})
.export(module);