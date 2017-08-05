import Ember from 'ember';
import config from './config/environment';

import HashParamSupport from 'ember-hash-params/router-mixin';

const Router = Ember.Router.extend(HashParamSupport, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('no-model', function() {
    this.route('before');
    this.route('after');
  });

  this.route('with-model', { path: '/with-model/:id' }, function() {
    this.route('before');
    this.route('after');
  });

  this.route('with-query-params', function() {
    this.route('before');
    this.route('after');
  });

  this.route('name-only', function() {
    this.route('before');
    this.route('after');
  });
});

export default Router;
