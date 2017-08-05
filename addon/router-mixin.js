import Ember from 'ember';

const { get, inject } = Ember;

export default Ember.Mixin.create({
  hashParams: inject.service(),

  transitionTo(...args) {
    const { hashParams } = args[args.length - 1];

    // If there are hash params, then we don't want them to passed along to
    // the `_super` implementation. Things get pretty dicey.
    if (hashParams) {
      const opts = args[args.length - 1];
      delete opts.hashParams;

      // If the options do not have a query param, we shouldn't pass the object
      // through to the `_super` implementation at all
      if (!opts.hasOwnProperty('queryParams')) {
        args.pop();
      }
    }

    const transition = this._super(...args);

    if (hashParams) {
      transition.then(() => {
        get(this, 'hashParams').setParams(hashParams);
      });
    }

    return transition;
  }
});
