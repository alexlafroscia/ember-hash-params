import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

moduleFor('service:hash-params', 'Unit | Service | hash params');

test('it can read a single hash param from the URL', function(assert) {
  const service = this.subject({
    router: Ember.Object.create({
      currentURL: '/path#foo=bar'
    })
  });

  assert.equal(service.getParam('foo'), 'bar');
});

test('it can read all hash params from the URL', function(assert) {
  const service = this.subject({
    router: Ember.Object.create({
      currentURL: '/path#foo=bar&baz=bop'
    })
  });

  assert.deepEqual(service.getParams(), {
    foo: 'bar',
    baz: 'bop'
  });
});

test('it can set a single hash param in the URL', function(assert) {
  assert.expect(0);

  const setURL = td.function();

  const service = this.subject({
    router: Ember.Object.create({
      currentURL: '/path',
      location: { setURL }
    })
  });

  service.setParam('foo', 'bar');

  td.verify(setURL('/path#foo=bar'));
});

test('it can set all hash params in the URL', function(assert) {
  assert.expect(0);

  const setURL = td.function();

  const service = this.subject({
    router: Ember.Object.create({
      currentURL: '/path',
      location: { setURL }
    })
  });

  service.setParams({
    foo: 'bar',
    baz: 'bop'
  });

  td.verify(setURL('/path#foo=bar&baz=bop'));
});
