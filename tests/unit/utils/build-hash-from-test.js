import buildHashFrom from 'ember-hash-params/utils/build-hash-from';
import { module, test } from 'qunit';

module('Unit | Utility | build hash from');

test('it can create a single key-value pair', function(assert) {
  const result = buildHashFrom({ foo: 'bar' });

  assert.equal(result, 'foo=bar');
});

test('it can create a set of key-value pairs', function(assert) {
  const result = buildHashFrom({
    foo: 'bar',
    baz: 'bop'
  });

  assert.equal(result, 'foo=bar&baz=bop');
});
