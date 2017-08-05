import Ember from 'ember';

const { get, inject } = Ember;

export default Ember.Route.extend({
  hashParams: inject.service(),

  beforeModel() {
    this.transitionTo('forward-params.after', {
      hashParams: get(this, 'hashParams').getParams()
    });
  }
});
