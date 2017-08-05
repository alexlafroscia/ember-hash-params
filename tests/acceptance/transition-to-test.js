import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Transitioning with hash params');

test('when the route has no model', async function(assert) {
  await visit('/no-model/before');

  assert.equal(currentURL(), '/no-model/after#foo=bar');
});

test('when the route has a model', async function(assert) {
  await visit('/with-model/1/before');

  assert.equal(currentURL(), '/with-model/1/after#foo=bar');
});

test('when query params are defined but not provided', async function(assert) {
  await visit('/with-query-params/before');

  assert.equal(currentURL(), '/with-query-params/after#foo=bar');
});

test('when query params are defined and provided', async function(assert) {
  await visit('/with-query-params/before?foo=bar#foo=bar');

  assert.equal(currentURL(), '/with-query-params/after?foo=bar#foo=bar');
});

test("it doesn't mess with a name-only transition", async function(assert) {
  await visit('/name-only/before');

  assert.equal(currentURL(), '/name-only/after');
});

test('it can forward all hash params', async function(assert) {
  await visit('/forward-params/before#foo=bar');

  assert.equal(currentURL(), '/forward-params/after#foo=bar');
});
