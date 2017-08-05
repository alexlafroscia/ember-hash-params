import parseHashParams from 'ember-hash-params/utils/parse-hash-params';
import { module, test } from 'qunit';

module('Unit | Utility | parse hash params');

test('can handle when there is no hash params', function(assert) {
  const result = parseHashParams('/foo');
  assert.deepEqual(result, {});
});

test('can handle a single hash param', function(assert) {
  const result = parseHashParams('/foo#foo=bar');
  assert.deepEqual(result, { foo: 'bar' });
});

test('can handle a set of hash params', function(assert) {
  const result = parseHashParams('/foo#foo=bar&baz=bop');
  assert.deepEqual(result, { foo: 'bar', baz: 'bop' });
});
