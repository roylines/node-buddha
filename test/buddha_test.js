var vows = require('vows'),
    assert = require('assert'),
    buddha = require('../lib/buddha.js');

vows.describe('buddha')
.addBatch({
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
        },
        'calling setOnBehalfOf' : {
            topic: function(credentials) {
                buddha.setOnBehalfOf(credentials.email);
                return buddha;
            },
            'should set onBehalfOf' : function(b) {                
                assert.equal(b.onBehalfOf, "a@a.a");
            },
            teardown : function(b) {
                b.setOnBehalfOf(null);
            }            
        }

    }
}).export(module);
