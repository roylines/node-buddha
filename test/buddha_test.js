var vows = require('vows'),
    assert = require('assert'),
    buddha = require('../lib/buddha.js');

vows.describe('buddha').addBatch({
    'when true': {
        topic: true,

        'should equal true': function(check) {
            assert.equal(check, true);
        }
    }
}).export(module);
