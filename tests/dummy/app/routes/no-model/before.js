import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('no-model.after', {
      hashParams: {
        foo: true
      }
    });
  }
});
