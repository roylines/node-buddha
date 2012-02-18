var vows = require('vows'),
    assert = require('assert'),
    buddha = require('../lib/buddha.js');

vows.describe('testing buddha test credentials').addBatch({
    'with valid credentials': {
        topic: { 
            email: "a@a.a",
            password: "PASSWORD" 
        },
        'calling setCredentials' : {
            topic: function(credentials) {
                buddha.setCredentials(credentials.email, credentials.password);
                return buddha;
            },
            'should set email' : function(b) {                
                assert.equal(b.email, "a@a.a");
            },
            'should set password' : function(b) {                
                assert.equal(b.password, "PASSWORD");
            },
            teardown : function(b) {
                b.setCredentials(null, null);
            }            
        }
    }
}).export(module);
