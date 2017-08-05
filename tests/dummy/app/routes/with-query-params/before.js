import Ember from 'ember';

const { get } = Ember;

export default Ember.Route.extend({
  beforeModel(transition) {
    const queryParams = get(transition, 'queryParams');

    this.transitionTo('with-query-params.after', {
      queryParams,
      hashParams: {
        foo: 'bar'
      }
    });
  }
});
