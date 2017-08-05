import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('with-model.after', 1, {
      hashParams: {
        foo: 'bar'
      }
    });
  }
});
