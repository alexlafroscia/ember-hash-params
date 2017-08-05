import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

moduleFor('service:hash-params', 'Unit | Service | hash params');

test('it can read hash params from the URL', function(assert) {
  const service = this.subject({
    router: Ember.Object.create({
      currentURL: '/path#foo=bar'
    })
  });

  assert.equal(service.get('foo'), 'bar');
});

test('it can set hash params in the URL', function(assert) {
  assert.expect(0);

  const setURL = td.function();

  const service = this.subject({
    router: Ember.Object.create({
      currentURL: '/path',
      location: { setURL }
    })
  });

  service.set('foo', 'bar');

  td.verify(setURL('/path#foo=bar'));
});
